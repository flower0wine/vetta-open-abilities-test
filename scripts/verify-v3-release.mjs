import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(resolve(root, ".vetta/marketplace.json"), "utf8"));
if (manifest.schemaVersion !== 3) throw new Error("Expected marketplace schema v3");

const plugins = manifest.abilities.flatMap((ability) =>
  ability.type === "plugin"
    ? [ability]
    : ability.type === "bundle"
      ? ability.config.members.filter((member) => member.type === "plugin" && member.source)
      : [],
);
for (const ability of plugins) {
  const plugin = JSON.parse(readFileSync(resolve(root, ability.source.path, "plugin.json"), "utf8"));
  const release = ability.releases?.find((candidate) => candidate.version === plugin.version);
  if (!release) throw new Error(`Missing release for ${ability.slug}@${plugin.version}`);
  const prefix = `${ability.slug}-${plugin.version}`;
  const archive = readFileSync(resolve(root, ".release-artifacts", `${prefix}.vettapkg`));
  const generated = JSON.parse(readFileSync(resolve(root, ".release-artifacts", `${prefix}.json`), "utf8"));
  if (JSON.stringify(release) !== JSON.stringify(generated)) {
    throw new Error(`Generated release differs from the catalog: ${ability.slug}`);
  }
  if (createHash("sha256").update(archive).digest("hex") !== release.artifact.sha256) {
    throw new Error(`Archive digest differs from the catalog: ${ability.slug}`);
  }
}

const trackedBuildOutput = execFileSync(
  "git",
  ["ls-files", "--", "abilities/plugins/*/dist", "abilities/plugins/*/release", ".release-artifacts"],
  { cwd: root, encoding: "utf8" },
).trim();
if (trackedBuildOutput) throw new Error(`Build output must not be committed:\n${trackedBuildOutput}`);
process.stdout.write(`Verified ${plugins.length} schema v3 plugin release.\n`);
