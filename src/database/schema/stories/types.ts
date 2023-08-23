export interface StorySchema {
  author: string;
  category_ids: number[];
  created_at_timestamp: number;
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
  updated_at_timestamp: number;
  colors?: ColorSchema | null;
  played_at_timestamp?: number;
  saved_at_timestamp?: number;
  small_preview_cover_cached_name?: string;
}

export interface ColorSchema {
  background: string;
  detail: string;
  primary: string;
  secondary: string;
}
