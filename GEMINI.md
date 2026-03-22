# Project Context: Moonlit (AI-Voice Client)

This document provides essential context about the Moonlit React Native mobile application. It is designed to help AI assistants (like Antigravity) understand the project's architecture, dependencies, and structure to provide context-aware and high-quality assistance.

> 🚨 **META RULE: CONTINUOUS CONTEXT MAINTENANCE** 🚨
> As an AI agent (e.g., Antigravity, Cursor, etc.), you **MUST ALWAYS** update this `GEMINI.md` file whenever you introduce or modify new core services, global utilities, meaningful architectural patterns, or standard practices in the project. You must proactively document these additions to ensure this file remains the highly-accurate, single source of truth and memory for future sessions. Failure to do so will result in lost coding context.

## Product Context

Moonlit is a React Native mobile application featuring fairytales for children.
**Key Feature:** The app allows users to choose a pre-defined voice to read a tale or to record their own voice, which is then used to synthesize and voice the tale.

### Technology Stack & Constraints

- **Package Manager**: ALWAYS use `yarn`. ALWAYS run `yarn restart` after adding or removing dependencies in `package.json`.
- **Framework**: Bare React Native (Do NOT use Expo).
- **Language**: TypeScript. Use strict typing for all components, functions, props, and state. NEVER use force unwrapping (`!`) or casting to `any` (`as any`).
- **Navigation**: Use `react-navigation`.
- **Testing**: `jest` for unit tests, `@testing-library/react-native` for integration tests. ALWAYS add global jest mocks to the created `setupJest.ts` file. ALWAYS use the `react-native-testing` skill when writing unit or integration tests. Ignore this skill in other scenarios.
  - 🚨 **META RULE: CONTINUOUS TESTING** 🚨 As an AI agent, you **MUST ALWAYS** update existing tests or implement new unit/integration tests whenever you modify or add any components, hooks, utilities, or services. You must verify that `yarn test` passes completely before concluding any task involving logic or UI changes. Code changes without corresponding test updates are strictly prohibited.
- **Linting**: ALWAYS run `yarn lint` after file changes.
  - 🚨 **META RULE: CONTINUOUS LINTING** 🚨 As an AI agent, you **MUST ALWAYS** run `yarn lint` and fix any linting errors that arise whenever you modify or add any files. You must verify that `yarn lint` passes completely before concluding any task. Code changes with unresolved lint errors are strictly prohibited.

### UI & Styling System (`useMakeStyles`)

- **Strict Rule**: DO NOT use plain `StyleSheet.create` directly in components, create `makeStyles` functions in the (${componentName}.styles.ts) file in the same directory.
- **Strict Rule**: ALWAYS use the `MakeStylesProps` prop type imported from `'@/hooks/theme/useMakeStyles'` for `makeStyles` function params.
- **Strict Rule**: ALWAYS remove unused styles from the `makeStyles` function in the `${componentName}.styles.ts` file when refactoring or updating components.
- **Strict Rule**: ALWAYS use destructuring of the `theme` param in `makeStyle` functions. NEVER access theme constants directly via `theme.[value]` (always use the values obtained from the destructured theme param instead).
- **Strict Rule**: DO NOT use literal constants (e.g., hardcoded colors, padding numbers, border radii) in styles. ALWAYS use the theme's values provided via the `makeStyles` function's parameters.
- **Strict Rule**: ALWAYS use font styles from the `fonts` object passed to the `makeStyles` parameters. NEVER use hardcoded `fontSize`, `lineHeight`, or `fontFamily` in component styles. If a required `fontSize` or `lineHeight` does not exist in `src/styles/fonts.ts`, you MUST add a new font definition there instead of hardcoding it.
- **Implementation**: Every style object MUST be created using a custom `useMakeStyles` hook.
- **Capabilities**: The `useMakeStyles` hook must provide:
  - Reactively-updated theme values (colors, typography, padding, and size constants).
  - Safe area values (e.g., integrating with `react-native-safe-area-context`).
  - The ability to pass custom variables to generate conditional styles dynamically.
- **No External UI Libraries**: Do not use component libraries (like NativeBase, UI Kitten, etc.). Rely solely on the customized `useMakeStyles` architecture.
- **Strict Rule**: ALWAYS use `TextView` component from `src/components/Primitives/TextView/TextView.tsx` instead of `Text` from `react-native`.
- **Strict Rule**: ALWAYS use `PressableView` component from `src/components/Primitives/PressableView/PressableView.tsx` for all clickable elements instead of React Native's `Button`, `TouchableOpacity`, `TouchableFeedback` and other clickable components.
- **Strict Rule**: NEVER use hardcoded text. ALWAYS use the `localize` function from the `useAppLocalization` (`src/localization/useAppLocalization.ts`) hook. Before adding any text, check if it exists in `src/localization/locals` and use its key if it exists, or add a new one to the relevant file.

### Architectural Principles

1. **Separation of Concerns**: Keep screen components lean. Move business logic, sorting, filtering, and data transformations into custom hooks.
2. **Component File Splitting**: ALWAYS split UI, styles, types, and constants of a component into separate files. Follow this strict naming convention:
   - UI: `ComponentName.tsx`
   - Styles: `ComponentName.styles.ts`
   - Types: `ComponentName.types.ts`
   - Constants: `ComponentName.constants.ts`
3. **Theming Layer as Single Source of Truth**: The `styles/themes/` directory holds all design tokens. The `useMakeStyles` hook acts as the sole bridge between these tokens and the components, ensuring centralized control over the app's aesthetics.
4. **Test Directory Organization**: ALWAYS place test files inside a `__tests__` folder at the top level of the module (e.g., `src/components/__tests__`, `src/utils/__tests__`, `src/screens/__tests__`). NEVER place test files adjacent to the source files (e.g., avoid `src/components/MyComponent/MyComponent.test.tsx`). This centralized module-level test directory structure must be strictly enforced.
5. **Navigation Hooks**: ALWAYS use the custom `useAppRoute` (from `src/navigation/hooks/useAppRoute.ts`) and `useAppNavigation` (from `src/navigation/hooks/useAppNavigation.ts`) hooks for navigation. NEVER use the `useRoute` and `useNavigation` hooks directly from `@react-navigation/native`.
6. **Security & Secrets**: ALWAYS store secrets and sensitive keys in the `src/constants/auth.ts` file. NEVER use `.env` files for secrets, because `.env` files might be extracted from unarchived builds (`.ipa`/`.apk`), whereas `auth.ts` is ignored by Git and injected only during the build process, making it safer.
7. **Interface Segregation**: ALWAYS follow the Interface Segregation principle from SOLID during React component creation. A component should ALWAYS receive only the specific data fields it needs via props, NEVER a whole, large object.
8. **Secure Storage**: ALWAYS use the `SecuredStorage` service (`src/services/securedStorage/securedStorage.ts`) to store, read, or delete sensitive user data (like tokens or credentials). NEVER use `AsyncStorage`, `react-native-mmkv`, or direct `react-native-keychain` access for sensitive information across the app. The `SecuredStorage` service abstracts the underlying secure storage implementation, ensuring that the actual persistence mechanism can be easily swapped in the future without affecting the consuming codebase.
9. **Global App Logic & Operations**: ALWAYS use the `AppLogicProvider` (`src/components/Providers/AppLogicProvider/AppLogicProvider.tsx`) as the central orchestrator for global app-level side effects, background fetchings, and initialization logic. This component is the designated place to invoke global custom hooks (e.g., tracking app launches, downloading previews, updating content) to keep individual screens clean and focused purely on UI presentation. DO NOT add global background logic to navigation routers or root components directly; place it inside `AppLogicProvider` instead.
### Database Access & Realm Hooks

- **Strict Rule**: ALWAYS use the custom hooks from `src/hooks/database/` to subscribe to and interact with Realm database objects instead of using `Realm` queries directly inside components. These hooks provide reactive wrapper over Realm results, thus automatically triggering re-renders when the underlying data is mutated in the database, preventing stale UI.
- **Available Data Hooks**:
  - `useStory(storyId, propsToWatch?)`: Retrieves a single `StorySchema` object by its ID and reacts to changes. Use `propsToWatch` (array of property names) to optimize performance by limiting re-renders to explicit property changes.
  - `useStories(filter?, sortConfigs?, maxNum?)`: Retrieves a reactive list of `StorySchema` objects, with optional filtering (via Realm string queries), custom sorting logic, and returning limits.
  - `useAudioRecording(audioRecordingId, propsToWatch?)`: Retrieves a single `AudioRecordingSchema` object by ID and reacts to its changes. Similar to `useStory`, it supports `propsToWatch` optimization.
  - `useAudioRecordings(filter?, sortConfig?)`: Retrieves a reactive list of `AudioRecordingSchema` objects, optionally filtered and sorted.
- **Available Action Hooks**:
  - `useSelectedAudioRecording(storyId)`: Retrieves the currently selected audio recording object for a given tale. Returns `{ selectedAudioRecording, selectedAudioRecordingVersion, setSelectedAudioRecording }`. The setter function correctly writes the user's choice back into the database.
  - `useHandleStoryFavorite({ source, storyId, storyName, tab })`: Manages the `is_favorite` status of a tale. Returns `{ isFavorite, handleStoryFavoritePress }`. It automatically toggles the local database record value and logs the appropriate user analytics event (`AnalyticsService.logTaleLikedEvent`) during interactions.

## Header Components (`src/components/Headers/`)

The project uses a set of standard header components to ensure consistency across screens.

### `ScreenHeader`
The primary header component for most screens.
- **Key Features**: Supports back navigation, custom left/right rendering, titles, and subtitles.
- **Scroll Integration**: If `scrollPositionSharedValue` (a Reanimated `SharedValue<number>`) is provided, it automatically handles the transition from a "Large Title" to a standard title as the user scrolls.
- **Back Navigation**: Standard back button is rendered by default unless `renderLeft` is provided. `onGoBack` can override the default `navigation.goBack()` behavior.

### `ModalHeader`
A specialized version of `ScreenHeader` designed specifically for modal screens.
- **Behavior**: It forces `renderLeft={null}` and provides a standard `Icons.Close` button on the right.
- **Props**: Inherits from `ScreenHeaderProps` but adds `onClosePress`, `hideClose`, and `disableClose`.

### `SearchHeader`
A header variation that provides a search trigger.
- **Behavior**: Typically used to navigate to a search-enabled home view.

### Shared Constants
- **`EXTRA_TOUCH_AREA`**: Always use this constant (from `Headers.constants.ts`) for `hitSlop` on header buttons to ensure accessible touch targets (16dp inset).

## Project Structure

The application source code is located within the `src/` directory. The architecture follows a standard React Native module-based structure:

- `src/api/`: Network requests and API endpoints (likely interacting with a backend for voice synthesis).
- `src/assets/`: Static resources like fonts, images, and possibly placeholder audio files.
- `src/components/`: Reusable, generic UI components (buttons, cards, modals).
- `src/constants/`: Application-wide constants, configuration values, and theme tokens.
- `src/database/`: Realm database initialization, schema definitions, and migration logic.
- `src/hooks/`: Custom React hooks containing reusable business or UI logic (e.g., `useSimilarAssets`).
- `src/localization/`: Multi-language support configuration and string translations.
- `src/native_modules/`: Bridges and custom native modules (contains `mnt-audioplayer`).
- `src/navigation/`: React Navigation stack definitions, tab configurations, and routing logic.
- `src/screens/`: High-level feature screens where components are composed (e.g., `HomeScreen`, `StoryPlayerScreens`, `StoriesListScreen`, `PaywallModal`, `GetStartedScreen`). Feature-specific domains are generally isolated here.
- `src/services/`: Integrations with external SDKs (`analytics`, `networkClient`, `remoteConfig`, `storage`).
- `src/store/`: Redux configuration (`store.ts`, `rootReducer.ts`), and feature slices (`player/`, `user/`, `subscription/`).
- `src/styles/`: Global stylesheets or styling themes.
- `src/types/`: Global TypeScript type definitions and interfaces.
- `src/utils/`: Pure helper functions and utilities.

## Available Scripts (`package.json`)

Here are the key commands available via `yarn <script>` or `npm run <script>`:

| Script    | Description                                                                      |
| --------- | -------------------------------------------------------------------------------- |
| `start`   | Starts the Metro bundler.                                                        |
| `android` | Builds and runs the application on an Android emulator or connected device.      |
| `ios`     | Builds and runs the application on an iOS simulator or connected device.         |
| `test`    | Runs test suites using Jest.                                                     |
| `lint`    | Runs ESLint across the codebase.                                                 |
| `restart` | Cleans the yarn cache, reinstalls packages, and starts Metro with a reset cache. |
