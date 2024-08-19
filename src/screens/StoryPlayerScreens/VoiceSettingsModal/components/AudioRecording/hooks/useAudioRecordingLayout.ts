import { useMemo } from 'react';

import { useLayout } from '@/hooks/theme/useLayout';

export interface AuidioRecordingLayout {
  audioRecordingHeight: number;
  audioRecordingWidth: number;
  cellSpace: number;
  numColumns: number;
}

export const useAudioRecordingLayout = () => {
  const { dw, horizontalPadding, windowMaxWidth, windowWidth } = useLayout();

  const layout = useMemo(() => {
    const audioRecordingHeight = dw(184, windowMaxWidth);
    const audioRecordingWidth = dw(163, windowMaxWidth);

    const numColumns = Math.floor(
      (windowWidth - horizontalPadding) / (audioRecordingWidth + horizontalPadding),
    );

    const cellSpace =
      (windowWidth - horizontalPadding - audioRecordingWidth * numColumns) / numColumns;

    return {
      audioRecordingHeight,
      audioRecordingWidth,
      cellSpace,
      numColumns,
    };
  }, [dw, horizontalPadding, windowMaxWidth, windowWidth]);

  return layout;
};
