# Vetta Open Abilities Test

Public test marketplace for the Vetta desktop application's GitHub ability source.

The `refa/marketplace-v3` branch exercises the schema v3 plugin artifact path. Its workflow builds and tests every plugin from source, creates deterministic ZIPs, checks the catalog digests, retains the ZIPs as a workflow artifact, and publishes the same bytes as test prerelease assets. The branch contains the real plugins from the official marketplace.

## Repository layout

```text
.vetta/marketplace.json
abilities/skills/<slug>/SKILL.md
abilities/scenes/<slug>/SKILL.md
abilities/mcp/<slug>/mcp.json
abilities/plugins/<slug>/plugin.json
abilities/bundles/<slug>/
abilities/<type>/<slug>/ability.json
abilities/<type>/<slug>/detail.json
abilities/<type>/<slug>/README.md
abilities/<type>/<slug>/assets/
```

## Update rules

- Increment `marketplaceVersion` whenever repository marketplace content changes.
- Keep each catalog `slug` and `version` equal to its `SKILL.md` frontmatter.
- Increment `configVersion` when an ability's configuration contract changes.
- Do not reuse one slug across skill and scene.
- Keep installation configuration in `mcp.json` / `plugin.json` and presentation resources in the same package's `ability.json`, detail file, and assets.
- Compose detail pages from the host-rendered block whitelist; never add executable HTML, JavaScript, CSS, iframe content, or custom actions.
- Keep plugin build output and release ZIPs out of Git. The v3 catalog references immutable release assets by version and SHA-256.

Brand SVGs are sourced from Simple Icons (CC0); product names and trademarks belong to their respective owners.
