import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const plugin = resolve(root, "abilities/plugins/open-marketplace-demo-plugin");
const output = resolve(plugin, "dist");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(resolve(plugin, "src/index.js"), resolve(output, "index.js"));
process.stdout.write("Built open-marketplace-demo-plugin.\n");
