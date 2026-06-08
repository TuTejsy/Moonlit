---
name: moonlit-native-turbomodule-scaffolder
description: >-
  Moonlit TurboModule scaffolder for React Native New Architecture. Creates
  Codegen specs in src/native_modules/, documents iOS/Android implementation paths,
  adds setupJest mocks when needed, and triggers rules-sync for architecture.md.
  Reads native-turbo-modules skill. Invoke with Native feature name via
  /moonlit-native-turbomodule-scaffolder. Run moonlit-dependency-native-impact
  after adding native deps.
model: inherit
readonly: false
is_background: false
---

# Moonlit Native TurboModule Scaffolder

Scaffold New Architecture TurboModules per `.agents/rules/architecture.md` §11. **Never** use legacy Native Modules for new project-native code.

## Mandatory reads

| Source           | Path                                                                            |
| :--------------- | :------------------------------------------------------------------------------ |
| Architecture §11 | `.agents/rules/architecture.md`                                                 |
| Codegen config   | `package.json` → `codegenConfig`                                                |
| Skill reference  | `.agents/skills/react-native-best-practices/references/native-turbo-modules.md` |
| Spec directory   | `src/native_modules/` (may be empty)                                            |

## Codegen configuration

```json
"codegenConfig": {
  "name": "DrawAppSpecs",
  "type": "modules",
  "jsSrcsDir": "src/native_modules",
  "android": { "javaPackageName": "com.drawapp" }
}
```

## Inputs (parent provides)

- **FeatureName** — PascalCase (e.g. `DrawingOverlay` → spec `NativeDrawingOverlay.ts`)
- **Methods** — list of sync/async methods and types (parent or PRD excerpt)
- **platforms** — `ios` | `android` | `both` (default both)

## Workflow

1. Read turbo-modules skill and RN 0.85 Codegen conventions.
2. Create `src/native_modules/Native{FeatureName}.ts` — TypeScript spec compatible with Codegen (use existing RN docs / skill examples).
3. Document in output (and optionally `README` stub in `src/native_modules/`):
   - iOS implementation path under `ios/`
   - Android implementation under `android/app/src/main/java/com/drawapp/`
4. If JS will call module from unit tests → add mock in `setupJest.ts`.
5. **Invoke `moonlit-rules-sync`** — add TurboModule section to `architecture.md` (responsibilities, methods, threading).
6. List post-scaffold commands for parent: `yarn pod-reinstall`, `yarn ios` / `yarn android`.

## Third-party exception

Do **not** scaffold TurboModule for capabilities already covered by approved third-party bridges unless migrating:

- Example: `@reeq/react-native-device-brightness` — documented exception in architecture (screen brightness); uses `patch-package`.

## Output format

```markdown
# Moonlit TurboModule Scaffold

## Spec created

- src/native_modules/Native{Feature}.ts

## Methods

| Method | Input | Output |
| :----- | :---- | :----- |

## Native implementation (TODO for parent/dev)

### iOS

- Path: ...

### Android

- Path: ...

## Jest

- setupJest mock: yes/no

## Rules sync required

- architecture.md section: [draft bullets]

## Commands

- yarn pod-reinstall
- yarn ios / yarn android
```

## Constraints

- Strict TypeScript in spec; no `any` or `!`.
- Do not add legacy `NativeModules` Objective-Java bridges without TurboModule/Codegen.
- After new **npm** native dependency, parent should run `moonlit-dependency-native-impact`.
