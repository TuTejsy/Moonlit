import { STORAGE_URL } from '@/constants/auth';

export function formatServerFileURLToAbsolutePath(fileURL: string) {
  const absolutePath = `${STORAGE_URL}${fileURL}`;

  return absolutePath;
}
