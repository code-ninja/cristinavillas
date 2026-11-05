import { fileURLToPath, URL } from "node:url";

/**
 * Registers client:interact — hydrate on first user signal (see entry script).
 * Optional: client:interact="scroll,keydown" (allowlisted names only), or
 * client:interact="self" / "self,pointerdown,..." to scope signals to the island.
 * Add "timeout:<ms>" to hydrate after a fallback delay if no signal occurs.
 */
export default function clientInteract() {
  return {
    name: "client-interact",
    hooks: {
      "astro:config:setup"({ addClientDirective }) {
        addClientDirective({
          name: "interact",
          entrypoint: fileURLToPath(
            new URL("./client-interact-entry.js", import.meta.url),
          ),
        });
      },
    },
  };
}
