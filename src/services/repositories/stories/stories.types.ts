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
  is_free: boolean;
  name: string;
  preview_cover_url: string;
  revision: number;
  type: number;
  updated_at_timestamp: number;
}

export interface GetStoriesResponse {
  data: Story[];
}
