/* eslint-disable react-native/no-unused-styles */
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import Svg, { SvgProps, G, Rect, Path } from 'react-native-svg';

import { MakeStylesProps, useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

const makeStyles = ({ colors }: MakeStylesProps) =>
  StyleSheet.create({
    blurView: {
      backgroundColor: colors.opacityBlack(0.4),
      height: 24,
      left: 0,
      position: 'absolute',
      top: 0,
      width: 24,
    },
    container: {
      alignItems: 'center',
      borderRadius: 12,
      height: 24,
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      width: 24,
    },
  });

export const Lock = ({ style, ...props }: SvgProps) => {
  const { colors } = useTheme();

  const styles = useMakeStyles(makeStyles);

  return (
    <View style={[styles.container, style]}>
      <BlurView
        blurAmount={2}
        blurType='light'
        reducedTransparencyFallbackColor={colors.opacityWhite(0.2)}
        style={styles.blurView}
      />
      <Svg height={24} viewBox='0 0 24 24' width={24} {...props}>
        <G filter='url(#filter0_b_186_1263)'>
          <Rect fill={colors.white} fillOpacity={0.2} height={24} rx={12} width={24} />
          <Path
            d='M9 17C8.725 17 8.4895 16.8973 8.2935 16.692C8.0975 16.4867 7.99967 16.2401 8 15.9524V10.7143C8 10.4262 8.098 10.1795 8.294 9.97414C8.49 9.76881 8.72533 9.66632 9 9.66667H9.5V8.61905C9.5 7.89444 9.74383 7.2767 10.2315 6.76581C10.7192 6.25492 11.3087 5.99965 12 6C12.6917 6 13.2813 6.25544 13.769 6.76633C14.2567 7.27722 14.5003 7.89479 14.5 8.61905V9.66667H15C15.275 9.66667 15.5105 9.76933 15.7065 9.97467C15.9025 10.18 16.0003 10.4265 16 10.7143V15.9524C16 16.2405 15.902 16.4872 15.706 16.6925C15.51 16.8979 15.2747 17.0003 15 17H9ZM12 14.381C12.275 14.381 12.5105 14.2783 12.7065 14.073C12.9025 13.8676 13.0003 13.6211 13 13.3333C13 13.0452 12.902 12.7985 12.706 12.5932C12.51 12.3879 12.2747 12.2854 12 12.2857C11.725 12.2857 11.4895 12.3884 11.2935 12.5937C11.0975 12.799 10.9997 13.0456 11 13.3333C11 13.6214 11.098 13.8681 11.294 14.0735C11.49 14.2788 11.7253 14.3813 12 14.381ZM10.5 9.66667H13.5V8.61905C13.5 8.18254 13.3542 7.81151 13.0625 7.50595C12.7708 7.2004 12.4167 7.04762 12 7.04762C11.5833 7.04762 11.2292 7.2004 10.9375 7.50595C10.6458 7.81151 10.5 8.18254 10.5 8.61905V9.66667Z'
            fill={colors.white}
          />
        </G>
      </Svg>
    </View>
  );
};
