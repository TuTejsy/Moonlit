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
  category_ids: string;
  created_at_timestamp: string;
  description: string;
  full_cover_url: string;
  id: number;
  is_favorite: boolean;
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
