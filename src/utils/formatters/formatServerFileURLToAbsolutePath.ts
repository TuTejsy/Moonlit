import { STORAGE_URL } from '@/constants/auth';

export function formatServerFileURLToAbsolutePath(fileURL: string) {
  const absolutePath = `https://547deb83eadbd91174eaf40fa7ab8999.r2.cloudflarestorage.com/moonlit-stories-dev/${fileURL}`;

  return absolutePath;
}
