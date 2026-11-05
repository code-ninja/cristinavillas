import { fileURLToPath, URL } from "node:url";

/**
 * Registers client:defer — DOMContentLoaded + delay (ms) then hydrate.
 * For window "load" instead, change the entry script listener.
 */
export default function clientDefer() {
  return {
    name: "client-defer",
    hooks: {
      "astro:config:setup"({ addClientDirective }) {
        addClientDirective({
          name: "defer",
          entrypoint: fileURLToPath(
            new URL("./client-after-ready-entry.js", import.meta.url),
          ),
        });
      },
    },
  };
}
