export interface AudioRecording {
  audio_url: number;
  created_at_timestamp: number;
  duration: number;
  extension: string;
  id: number;
  name: string;
  size: number;
  story_id: string;
  updated_at_timestamp: number;
}

export interface Story {
  author: string;
  category_ids: number[];
  created_at_timestamp: number;
  description: string;
  full_cover_url: string;
  id: number;
  is_favorite: boolean;
  is_free: boolean;
  name: string;
  played_count: number;
  revision: number;
  small_preview_cover_url: string;
  type: number;
  updated_at_timestamp: number;
}

export interface GetStoriesResponse {
  data: Story[];
}
