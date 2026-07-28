# Vetta Open Abilities Test

Public test marketplace for the Vetta desktop application's GitHub ability source.

## Repository layout

```text
.vetta/marketplace.json
abilities/skills/<slug>/SKILL.md
abilities/scenes/<slug>/SKILL.md
abilities/mcp/<slug>/mcp.json
```

## Update rules

- Increment `marketplaceVersion` whenever repository marketplace content changes.
- Keep each catalog `slug` and `version` equal to its `SKILL.md` frontmatter.
- Increment `configVersion` when an ability's configuration contract changes.
- Do not reuse one slug across skill and scene.
- Keep installation configuration in the ability package and user guidance in that ability's independent `detail` entry.
