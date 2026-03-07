import { useMemo } from 'react';

import { useTheme } from '@/hooks/theme/useTheme';
import { convertHEXtoRGBA } from '@/utils/converters/convertHEXtoRGBA';

interface UseStoryPlayerThemeProps {
  storyColorPrimary?: string;
}

export const useStoryPlayerTheme = ({ storyColorPrimary }: UseStoryPlayerThemeProps) => {
  const { colors } = useTheme();

  const gradientColor = useMemo(
    () => storyColorPrimary ?? colors.imagePurple,
    [colors.imagePurple, storyColorPrimary],
  );

  const backgroundColor = useMemo(() => convertHEXtoRGBA(gradientColor, 0.3), [gradientColor]);

  const backgroundGradientColors = useMemo(
    () => [backgroundColor, colors.black],
    [backgroundColor, colors.black],
  );

  const bottomGradientColors1 = useMemo(
    () => [colors.opacityBlack(0), gradientColor],
    [colors, gradientColor],
  );

  const bottomGradientColors2 = useMemo(
    () => [colors.opacityBlack(0), colors.opacityBlack(0.4)],
    [colors],
  );

  return {
    backgroundColor,
    backgroundGradientColors,
    bottomGradientColors1,
    bottomGradientColors2,
    gradientColor,
  };
};
