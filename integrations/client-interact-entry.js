/**
 * Hydrate on first allowed user signal (defaults: mousemove, pointerdown,
 * touchstart, click). options.value: comma-separated tokens — optional
 * `self` (listen on this island only, not the whole document), allowlisted event
 * names, `timeout:<ms>` as a fallback, and `remember:<key>` to hydrate
 * immediately on later same-session, non-reload navigations; or empty / "true"
 * for defaults on `window`. Not client:visible.
 *
 * @type {import("astro").ClientDirective}
 */
const ALLOW = new Set([
  "scroll",
  "mousemove",
  "pointerdown",
  "touchstart",
  "click",
  "keydown",
]);

const DEFAULT_EVENTS = [
  "mousemove",
  "pointerdown",
  "touchstart",
  "click",
];
const REMEMBER_PREFIX = "astro:interact:";
const REMEMBER_TTL_MS = 60 * 60 * 1000;

/**
 * @param {string | undefined} raw
 * @returns {{ self: boolean; events: string[]; timeoutMs: number | undefined; rememberKey: string | undefined }}
 */
function parseValue(raw) {
  if (raw == null || raw === "" || raw === "true" || raw === "false") {
    return {
      self: false,
      events: DEFAULT_EVENTS.slice(),
      timeoutMs: undefined,
      rememberKey: undefined,
    };
  }
  const named = [];
  let self = false;
  let timeoutMs;
  let rememberKey;
  for (const part of String(raw).split(",")) {
    const name = part.trim();
    if (name === "self") {
      self = true;
    } else if (ALLOW.has(name)) {
      named.push(name);
    } else if (name.startsWith("timeout:")) {
      const value = Number(name.slice("timeout:".length));
      if (Number.isFinite(value) && value >= 0) {
        timeoutMs = value;
      }
    } else if (name.startsWith("remember:")) {
      const value = name.slice("remember:".length).trim();
      if (value) {
        rememberKey = value;
      }
    }
  }
  return {
    self,
    events: named.length ? named : DEFAULT_EVENTS.slice(),
    timeoutMs,
    rememberKey,
  };
}

/**
 * @param {string} type
 * @param {boolean} onElement
 */
function listenerOpts(type, onElement) {
  if (onElement && type === "scroll") {
    return { capture: true, passive: true };
  }
  const capture =
    type === "touchstart" ||
    type === "click" ||
    type === "keydown" ||
    (onElement && (type === "pointerdown" || type === "touchstart"));
  const passive =
    type === "scroll" ||
    type === "mousemove" ||
    type === "pointerdown" ||
    type === "touchstart";
  return passive ? { capture, passive: true } : { capture };
}

function isReloadNavigation() {
  try {
    const [nav] = window.performance.getEntriesByType("navigation");
    return nav?.type === "reload";
  } catch {
    return false;
  }
}

function isColdEntryNavigation() {
  const { referrer } = document;
  if (!referrer) return true;

  try {
    return new window.URL(referrer).origin !== window.location.origin;
  } catch {
    return true;
  }
}

function shouldIgnoreRememberMarker() {
  return isReloadNavigation() || isColdEntryNavigation();
}

/**
 * @param {string | undefined} key
 */
function rememberStorageKey(key) {
  return key ? `${REMEMBER_PREFIX}${key}` : undefined;
}

/**
 * @param {string | undefined} key
 */
function hasFreshRememberMarker(key) {
  const storageKey = rememberStorageKey(key);
  if (!storageKey) return false;

  try {
    const stored = window.sessionStorage.getItem(storageKey);
    const hydratedAt = stored ? Number(stored) : NaN;
    if (!Number.isFinite(hydratedAt)) {
      if (stored != null) window.sessionStorage.removeItem(storageKey);
      return false;
    }

    const isFresh = Date.now() - hydratedAt < REMEMBER_TTL_MS;
    if (!isFresh) {
      window.sessionStorage.removeItem(storageKey);
    }
    return isFresh;
  } catch {
    return false;
  }
}

/**
 * @param {string | undefined} key
 */
function writeRememberMarker(key) {
  const storageKey = rememberStorageKey(key);
  if (!storageKey) return;

  try {
    window.sessionStorage.setItem(storageKey, String(Date.now()));
  } catch {
    // Storage can be unavailable in privacy modes; hydration should still work.
  }
}

export default (load, options, el) => {
  const {
    self,
    events: types,
    timeoutMs,
    rememberKey,
  } = parseValue(options.value);
  const root = self && el instanceof HTMLElement ? el : null;
  let started = false;
  let timeoutId;
  /** @type {Array<() => void>} */
  const removers = [];

  function removeAll() {
    if (timeoutId !== undefined) {
      window.clearTimeout(timeoutId);
      timeoutId = undefined;
    }
    for (const rm of removers) rm();
    removers.length = 0;
  }

  async function hydrate() {
    if (started) return;
    started = true;
    removeAll();
    writeRememberMarker(rememberKey);
    const start = await load();
    await start();
  }

  function onSignal() {
    void hydrate();
  }

  if (hasFreshRememberMarker(rememberKey) && !shouldIgnoreRememberMarker()) {
    void hydrate();
    return;
  }

  for (const type of types) {
    if (type === "keydown" && root) {
      function onKeydown(ev) {
        if (!(ev.target instanceof Node) || !root.contains(ev.target)) return;
        onSignal();
      }
      document.addEventListener("keydown", onKeydown, { capture: true });
      removers.push(() =>
        document.removeEventListener("keydown", onKeydown, { capture: true }),
      );
      continue;
    }

    const target = root ?? window;
    const opts = listenerOpts(type, Boolean(root));
    if (type === "scroll") {
      // Browser scroll restoration can fire during reload/history navigation
      // before the user acts; wait a frame before treating scroll as intent.
      const rafId = window.requestAnimationFrame(() => {
        if (started) return;
        target.addEventListener(type, onSignal, opts);
        removers.push(() => target.removeEventListener(type, onSignal, opts));
      });
      removers.push(() => window.cancelAnimationFrame(rafId));
      continue;
    }

    target.addEventListener(type, onSignal, opts);
    removers.push(() => target.removeEventListener(type, onSignal, opts));
  }

  if (timeoutMs !== undefined) {
    timeoutId = window.setTimeout(() => {
      void hydrate();
    }, timeoutMs);
  }
};
