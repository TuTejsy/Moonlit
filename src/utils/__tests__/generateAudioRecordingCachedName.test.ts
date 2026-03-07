import { AudioRecordingSchema } from '@/database/schema/audioRecordings/types';

import { generateAudioRecordingCachedName } from '../generators/generateAudioRecordingCachedName';

const createMockAudioRecording = (
  overrides: Partial<AudioRecordingSchema> = {},
): AudioRecordingSchema => ({
  audio_url: 'https://example.com/audio/recording.mp3',
  cover_url: 'https://example.com/cover.jpg',
  created_at_timestamp: 1000,
  duration: 120,
  id: 5,
  is_free: true,
  name: 'Test Recording',
  size: 1024,
  story_id: 1,
  updated_at_timestamp: 1000,
  voice_id: 1,
  voice_name: 'Test Voice',
  ...overrides,
});

describe('generateAudioRecordingCachedName', () => {
  it('returns a cached name using the id and file extension', () => {
    const recording = createMockAudioRecording();

    expect(generateAudioRecordingCachedName(recording)).toBe('5.mp3');
  });

  it('handles wav extension', () => {
    const recording = createMockAudioRecording({
      audio_url: 'https://example.com/audio/my-recording.wav',
      id: 10,
    });

    expect(generateAudioRecordingCachedName(recording)).toBe('10.wav');
  });

  it('returns undefined when audio_url is empty', () => {
    const recording = createMockAudioRecording({ audio_url: '' });

    expect(generateAudioRecordingCachedName(recording)).toBeUndefined();
  });

  it('handles nested audio URL paths', () => {
    const recording = createMockAudioRecording({
      audio_url: 'https://cdn.example.com/voices/en/story1.m4a',
      id: 77,
    });

    expect(generateAudioRecordingCachedName(recording)).toBe('77.m4a');
  });
});
