---
name: moonlit-ai-context
description: >-
  Maintaining Moonlit AI context (rules, skills, agents) for accuracy and token
  efficiency. Use when changing .agents/rules, .agents/skills, .cursor/agents,
  introducing architectural patterns, or when the user approves a stop-hook drift report.
---

# Moonlit AI Context Maintenance

Keep rules, skills, and agents aligned with the codebase without wasting tokens on duplicate prose.

## When to update context yourself

During feature work, update context **inline** when you:

- Add or change a **global pattern** (new service, hook contract, navigation flow, TurboModule)
- Introduce a **new subagent or skill** for a domain (paywall, story player, reanimated, etc.)
- Change file paths referenced in agent/skill docs

Add **minimal bullets** to the right `.agents/rules/{topic}.md` and mirror to `.cursor/rules/moonlit-*.mdc`.

## When to defer to agents

| Situation                                             | Invoke                                                                        |
| :---------------------------------------------------- | :---------------------------------------------------------------------------- |
| Post-session drift audit, dedup, token trims          | `/moonlit-context-curator`                                                    |
| Mirror-only after you already edited `.agents/rules/` | `/moonlit-rules-sync`                                                         |
| Stop hook reports "AI context drift detected"         | Summarize drift, ask user; run `/moonlit-context-curator` only after approval |

The stop hook (`.agents/hooks/context-drift-check.sh`) runs after quality checks pass when:

- Architectural `src/` changed without context updates (`.agents/rules/`, `.agents/skills/`, `.cursor/rules/`, `.cursor/agents/`)
- Paywall code changed without updates to `moonlit-paywall-screen` skill or `moonlit-paywall-flow` agent
- Story player code changed without updates to `moonlit-story-player` skill

Context-only edits do **not** stop-hook. Use `/moonlit-context-curator` manually when you want a self-audit.

## Token habits

1. **Link, don't copy** — Paywall: [`moonlit-paywall-screen`](../moonlit-paywall-screen/SKILL.md); story player: [`moonlit-story-player`](../moonlit-story-player/SKILL.md).
2. **One source of truth** — Diagrams and file-placement tables belong in skills; agents get routing `description` + links only.
3. **Keep always-on context small** — `moonlit-core.mdc` is index + stack; detailed rules live in scoped `.mdc` files.
4. **Split large skills** — `SKILL.md` under ~200 lines; depth in `reference.md`.

## File ownership

| Layer           | Path                          |
| :-------------- | :---------------------------- |
| Canonical rules | `.agents/rules/*.md`          |
| Cursor rules    | `.cursor/rules/moonlit-*.mdc` |
| Skills          | `.agents/skills/{name}/`      |
| Subagents       | `.cursor/agents/moonlit-*.md` |
| Index           | `AGENTS.md`                   |

## Canonical ↔ Cursor mapping

| Canonical            | Cursor mirror                           |
| :------------------- | :-------------------------------------- |
| `architecture.md`    | `moonlit-architecture.mdc`              |
| `ui-styling.md`      | `moonlit-ui-styling.mdc`                |
| `testing-linting.md` | `moonlit-testing-quality.mdc`           |
| `project-context.md` | `moonlit-project-structure.mdc`         |
| `database.md`        | `moonlit-database.mdc`                  |
| `headers.md`         | `moonlit-headers.mdc`                   |
| `reanimated.md`      | `moonlit-reanimated.mdc`                |
| —                    | `moonlit-core.mdc` (index + stack only) |

## Do not

- Edit `src/` from context-curator or rules-sync agents
- Duplicate full architecture prose in `moonlit-core.mdc`
- Create new agents/skills without clear drift evidence
