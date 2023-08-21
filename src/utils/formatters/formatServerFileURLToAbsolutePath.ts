import { SUPABASE_URL } from '@/constants/common';

export function formatServerFileURLToAbsolutePath(fileURL: string) {
  const absolutePath = `${SUPABASE_URL}storage/v1/object/public/Stories/${fileURL}`;

  return absolutePath;
}
