# Vetta Open Abilities Test

Public test marketplace for the Vetta desktop application's GitHub ability source.

## Repository layout

```text
.vetta/marketplace.json
abilities/skills/<slug>/SKILL.md
abilities/scenes/<slug>/SKILL.md
abilities/mcp/<slug>/mcp.json
abilities/mcp/<slug>/ability.json
abilities/mcp/<slug>/detail.json
abilities/mcp/<slug>/assets/icon.svg
```

## Update rules

- Increment `marketplaceVersion` whenever repository marketplace content changes.
- Keep each catalog `slug` and `version` equal to its `SKILL.md` frontmatter.
- Increment `configVersion` when an ability's configuration contract changes.
- Do not reuse one slug across skill and scene.
- Keep installation configuration in `mcp.json` and presentation resources in the same package's `ability.json`, detail file, and assets.

Brand SVGs are sourced from Simple Icons (CC0); product names and trademarks belong to their respective owners.
