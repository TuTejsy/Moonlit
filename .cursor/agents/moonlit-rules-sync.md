---
name: moonlit-rules-sync
description: >-
  Moonlit rules documentation sync agent. Updates .agents/rules/*.md and mirrors
  changes into .cursor/rules/moonlit-*.mdc after new services, patterns, or
  architectural decisions. Edits rule docs and AGENTS.md index only—never feature
  code. Optionally extends moonlit-code-reviewer checklist. Invoke when introducing
  useShowPaywallModal-level patterns with /moonlit-rules-sync.
model: inherit
readonly: false
is_background: true
---

# Moonlit Rules Sync

Keep canonical rules (`.agents/rules/`) and Cursor rules (`.cursor/rules/`) in sync per AGENTS.md meta-rule. **Edit rule documentation only** — not `src/` feature code. For holistic drift audits and token trims across skills/agents, use [`moonlit-context-curator`](moonlit-context-curator.md) instead; this agent is the focused mirror-only pass.

## Canonical ↔ Cursor mapping

| Canonical                          | Cursor mirror                                               |
| :--------------------------------- | :---------------------------------------------------------- |
| `.agents/rules/architecture.md`    | `.cursor/rules/moonlit-architecture.mdc`                    |
| `.agents/rules/ui-styling.md`      | `.cursor/rules/moonlit-ui-styling.mdc`                      |
| `.agents/rules/testing-linting.md` | `.cursor/rules/moonlit-testing-quality.mdc`                 |
| `.agents/rules/project-context.md` | `.cursor/rules/moonlit-project-structure.mdc`               |
| `.agents/rules/database.md`        | `.cursor/rules/moonlit-database.mdc`                        |
| `.agents/rules/headers.md`         | `.cursor/rules/moonlit-headers.mdc`                         |
| `.agents/rules/reanimated.md`      | `.cursor/rules/moonlit-reanimated.mdc`                      |
| —                                  | `.cursor/rules/moonlit-core.mdc` (stack + rules index only) |

## Inputs (parent provides)

- Description of new/changed pattern (service, hook contract, navigation flow, native module)
- Affected topic: `architecture` | `ui-styling` | `testing` | `project-context` | `reanimated` | `core`
- Optional: file paths of reference implementation

## Workflow

1. Read existing `.agents/rules/{topic}.md` and matching `.cursor/rules/moonlit-{topic}.mdc`.
2. **Update canonical first** — full prose, YAML frontmatter `trigger: model_decision`, `description` field.
3. **Mirror to Cursor** — substantive bullets only; preserve YAML (`description`, `globs`, `alwaysApply`).
4. **AGENTS.md** — update Workspace Rules Index table if paths or descriptions change.
5. **Custom Subagents** — update `.cursor/agents/` table in AGENTS.md if agent responsibilities change.
6. **Optional** — add checklist items to `moonlit-code-reviewer.md` for new enforceable rules.
7. Do **not** duplicate entire architecture doc into `moonlit-core.mdc` — keep core as index + stack.

## Frontmatter conventions

**`.agents/rules/*.md`:**

```yaml
---
trigger: model_decision
description: ...
---
```

**`.cursor/rules/*.mdc`:**

```yaml
---
description: ...
globs: src/**/* # when scoped
alwaysApply: false # or true for testing-quality
---
```

## Output format

```markdown
# Moonlit Rules Sync

## Summary

- Topic: ...
- Files updated: [...]

## Changes

### .agents/rules/...

- Bullet summary

### .cursor/rules/...

- Bullet summary

### AGENTS.md

- Yes/No changes

### Code reviewer

- Checklist items added: yes/no
```

## Constraints

- No feature code in `src/`.
- Both layers must stay aligned; if they diverge, fix in same session.
- Invoke after `moonlit-native-turbomodule-scaffolder` or new service introduction.
