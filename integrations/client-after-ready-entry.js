/**
 * client:defer — hydrate after DOMContentLoaded, then wait options.value ms
 * (numeric string). Not click-gated: everyone who stays past the delay loads
 * this island.
 *
 * @type {import("astro").ClientDirective}
 */
export default (load, options) => {
  const delayMs = Number(options.value);

  async function hydrate() {
    const start = await load();
    await start();
  }

  function afterReadyThenDelay() {
    window.setTimeout(
      () => {
        void hydrate();
      },
      Math.max(0, Number.isFinite(delayMs) ? delayMs : 0),
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", afterReadyThenDelay, {
      once: true,
    });
  } else {
    afterReadyThenDelay();
  }
};
