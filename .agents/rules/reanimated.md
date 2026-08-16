---
trigger: model_decision
description: Reanimated 4 and react-native-worklets threading APIs for Moonlit.
globs: 'src/**/*.ts, src/**/*.tsx'
---

# Reanimated & Worklets

Moonlit uses **Reanimated 4** with **`react-native-worklets`**. The Babel plugin is `react-native-worklets/plugin` (see `babel.config.js`).

RN 0.87 needs Reanimated **4.6.x** (4.5.x fails `pod install`). 4.6 stable is not on npm yet (latest stable is 4.5.3). Until it is, pin matching nightlies: `react-native-reanimated@4.6.0-nightly-20260815-4e0d15867` and `react-native-worklets@0.13.0-nightly-20260815-4e0d15867`. Do not mix Reanimated/worklets SHAs. Swap both to stable 4.6.x together as soon as `pod install` succeeds.

## Call JS from worklets / gesture handlers

When a Reanimated worklet or Gesture Handler callback must invoke React state, props, or other JS-thread code, use **`scheduleOnRN`** from `react-native-worklets`.

- **Do**: `import { scheduleOnRN } from 'react-native-worklets';`
- **Do**: `scheduleOnRN(myCallback, arg1, arg2)` — pass the function and its arguments in one call.
- **Don't**: `runOnJS` from `react-native-reanimated` — deprecated in Reanimated 4.

### Migration pattern

```typescript
// Deprecated (Reanimated 3)
import { runOnJS } from 'react-native-reanimated';
runOnJS(onValueChange)(next, true);

// Required (Reanimated 4)
import { scheduleOnRN } from 'react-native-worklets';
scheduleOnRN(onValueChange, next, true);
```

## Gesture Handler 3

Story player uses RNGH 3 **hook API** (`usePanGesture`, `useTapGesture`, `useCompetingGestures`) — not `Gesture.Pan()` builder. File placement and patterns: [`moonlit-story-player`](../skills/moonlit-story-player/SKILL.md) § Gestures.

## Baseline files using `scheduleOnRN`

- `src/screens/StoryPlayerScreens/StoryPlayerScreen/hooks/useStoryCoverGestureHandler.ts`
- `src/screens/StoryPlayerScreens/StoryPlayerScreen/components/StoryPlayer/components/ProgressBar/hooks/useProgressBarGestureHandler.ts`
- `src/screens/StoryPlayerScreens/StoryPlayerScreen/StoryPlayerScreen.tsx`
- `src/screens/SplashViewModal/SplashViewModal.tsx`

## Related threading APIs

| Deprecated (Reanimated 3)             | Use instead                 |
| :------------------------------------ | :-------------------------- |
| `runOnJS(fn)(...args)`                | `scheduleOnRN(fn, ...args)` |
| `runOnUI(fn)(...args)`                | `scheduleOnUI(fn, ...args)` |
| `executeOnUIRuntimeSync(fn)(...args)` | `runOnUISync(fn, ...args)`  |

## Tests

Jest mocks `scheduleOnRN` in `setupJest.ts` so gesture/worklet code can call JS callbacks synchronously in unit tests.
