import { useMemo } from 'react';

import { useLayout } from '@/hooks/theme/useLayout';

export interface AuidioRecordingLayout {
  audioRecordingHeight: number;
  audioRecordingMargin: number;
  audioRecordingWidth: number;
}

export const useAudioRecordingLayout = () => {
  const { dw, windowMaxWidth } = useLayout();

  const layout = useMemo(() => {
    const audioRecordingHeight = dw(184, windowMaxWidth);
    const audioRecordingWidth = dw(163, windowMaxWidth);
    const audioRecordingMargin = dw(15);

    return {
      audioRecordingHeight,
      audioRecordingMargin,
      audioRecordingWidth,
    };
  }, [dw, windowMaxWidth]);

  return layout;
};
