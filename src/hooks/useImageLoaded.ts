import { useCallback, useState } from 'react';

export function useImageLoaded() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  return { handleImageLoad, isImageLoaded };
}
