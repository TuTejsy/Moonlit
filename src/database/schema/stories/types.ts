export interface StorySchema {
  author: string;
  category_ids: number[];
  created_at_timestamp: number;
  description: string;
  description_large: string;
  full_cover_url: string;
  id: number;
  is_coming_soon: boolean;
  is_favorite: boolean;
  is_featuring: boolean;
  is_free: boolean;
  medium_cover_url: string;
  name: string;
  played_count: number;
  revision: number;
  small_cover_url: string;
  type: number;
  updated_at_timestamp: number;
  colors?: ColorSchema | null;
  full_cover_cached_name?: string | null;
  medium_cover_cached_name?: string | null;
  played_at_timestamp?: number;
  saved_at_timestamp?: number;
  selected_audio_recording_id?: number;
  small_cover_cached_name?: string | null;
}

export interface ColorSchema {
  background: string;
  detail: string;
  primary: string;
  secondary: string;
}
