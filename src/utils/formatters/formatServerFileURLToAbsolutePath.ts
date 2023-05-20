import { SUPABASE_URL } from '@/constants/common';

export function formatServerFileURLToAbsolutePath(fileURL: string) {
  const absolutePath = `${SUPABASE_URL}${fileURL}`;
  return absolutePath;
}
