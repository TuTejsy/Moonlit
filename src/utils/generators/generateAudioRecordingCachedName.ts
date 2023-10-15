import { AudioRecordingSchema } from '@/database/schema/audioRecordings/types';

import { getFileExtension } from './getFileExtension';

export function generateAudioRecordingCachedName(audioRecording: AudioRecordingSchema) {
  const fileExtension = getFileExtension(audioRecording.audio_url);

  return `${audioRecording.id}.${fileExtension}`;
}
