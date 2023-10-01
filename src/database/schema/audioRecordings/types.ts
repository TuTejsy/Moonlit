export interface AudioRecordingSchema {
  audioURL: string;
  createdAtTimestamp: number;
  duration: number;
  id: number;
  isFree: boolean;
  name: string;
  size: number;
  storyId: number;
  updatedAtTimestamp: number;
  voiceCoverUrl: string;
}
