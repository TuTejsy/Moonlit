export interface StorySchema {
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
  preview_cover_url: string;
  revision: number;
  type: number;
  updated_at_timestamp: number;
  played_at_timestamp?: number;
  saved_at_timestamp?: number;
}
