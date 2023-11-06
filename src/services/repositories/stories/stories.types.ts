export interface Voice {
  cover_url: string;
  id: number;
  is_free: boolean;
  name: string;
}

export interface AudioRecording {
  audio_url: string;
  created_at_timestamp: string;
  duration: number;
  id: number;
  name: string;
  size: number;
  story_id: number;
  updated_at_timestamp: string;
  voices: Voice;
}

export interface Story {
  author: string;
  category_ids: number;
  created_at_timestamp: string;
  description: string;
  full_cover_url: string;
  id: number;
  is_featuring: boolean;
  is_free: boolean;
  medium_cover_url: string;
  name: string;
  played_count: number;
  revision: number;
  small_cover_url: string;
  type: number;
  updated_at_timestamp: string;
}

export interface GetStoriesResponse {
  data: Story[];
}

export interface GetAudioRecordingsResponse {
  data: AudioRecording[];
}
