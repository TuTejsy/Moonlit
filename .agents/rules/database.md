---
trigger: model_decision
description: Realm database query constraints, reactive hooks (useStory, useStories), and action hooks.
globs: "src/database/**/*, src/hooks/database/**/*, src/screens/**/*.tsx, src/components/**/*.tsx"
---

# Database Access & Realm Hooks

This rule outlines guidelines for subscribing to and querying from the Realm database.

## Realm Database Access Constraints

- **Strict Rule**: ALWAYS use the custom hooks from `src/hooks/database/` to subscribe to and interact with Realm database objects instead of using `Realm` queries directly inside components. These hooks provide a reactive wrapper over Realm results, thus automatically triggering re-renders when the underlying data is mutated in the database, preventing stale UI.

## Available Data Hooks

- `useStory(storyId, propsToWatch?)`: Retrieves a single `StorySchema` object by its ID and reacts to changes. Use `propsToWatch` (array of property names) to optimize performance by limiting re-renders to explicit property changes.
- `useStories(filter?, sortConfigs?, maxNum?)`: Retrieves a reactive list of `StorySchema` objects, with optional filtering (via Realm string queries), custom sorting logic, and returning limits.
- `useAudioRecording(audioRecordingId, propsToWatch?)`: Retrieves a single `AudioRecordingSchema` object by ID and reacts to its changes. Similar to `useStory`, it supports `propsToWatch` optimization.
- `useAudioRecordings(filter?, sortConfig?)`: Retrieves a reactive list of `AudioRecordingSchema` objects, optionally filtered and sorted.

## Available Action Hooks

- `useSelectedAudioRecording(storyId)`: Retrieves the currently selected audio recording object for a given tale. Returns `{ selectedAudioRecording, selectedAudioRecordingVersion, setSelectedAudioRecording }`. The setter function correctly writes the user's choice back into the database.
- `useHandleStoryFavorite({ source, storyId, storyName, tab })`: Manages the `is_favorite` status of a tale. Returns `{ isFavorite, handleStoryFavoritePress }`. It automatically toggles the local database record value and logs the appropriate user analytics event (`AnalyticsService.logTaleLikedEvent`) during interactions.