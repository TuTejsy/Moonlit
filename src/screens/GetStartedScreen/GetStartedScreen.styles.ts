import { StyleSheet } from 'react-native';

import { IS_ANDROID } from '@/constants/common';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({
  colors,
  dh,
  dw,
  fonts,
  insets,
  windowMaxWidth,
  windowWidth,
}: MakeStylesProps) =>
  StyleSheet.create({
    backButtonContainer: {
      alignItems: 'center',
      marginTop: dh(35),
    },
    backText: {
      ...fonts.size_16,
      color: colors.opacityWhite(0.5),
    },
    continueButton: StyleSheet.flatten([
      IS_ANDROID && {
        width: dw(205, windowMaxWidth),
      },
    ]),
    continueText: {
      ...fonts.size_16,
      color: colors.white,
    },
    controls: {
      alignItems: 'center',
      marginTop: dh(32),
      width: '100%',
    },
    description: {
      ...fonts.size_14,
      color: colors.opacityWhite(0.5),
      paddingHorizontal: 32,
      textAlign: 'center',
    },
    image: {
      marginTop: insets.top,
      width: '100%',
    },
    image1: {
      height: dw(483, windowMaxWidth),
    },
    image2: {
      height: dw(540, windowMaxWidth),
    },
    image3: {
      height: dw(617, windowMaxWidth),
      marginTop: 0,
    },
    indicatorsContainer: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      height: dh(49),
      justifyContent: 'center',
      paddingBottom: dh(16),
    },
    screen: {
      alignItems: 'flex-start',
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: insets.bottom,
    },
    stepContainer: {
      alignItems: 'center',
      width: windowWidth,
    },
    stepDescriptionsContainer: {
      flexDirection: 'row',
      marginTop: dh(16),
    },
    stepImagesContainer: {
      flexDirection: 'row',
      position: 'absolute',
      top: 0,
    },
    stepTagsContainer: {
      flexDirection: 'row',
    },
    stepTitlesContainer: {
      flexDirection: 'row',
      marginTop: dh(18),
    },
    stepsContentContainer: {
      alignItems: 'flex-start',
      flex: 1,
      justifyContent: 'flex-end',
    },
    tag: {
      ...fonts.size_12,
      color: colors.white,
    },
    tagContainer: {
      backgroundColor: colors.opacityWhite(0.1),
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 2,
    },
    title: {
      ...fonts.size_32,
      color: colors.white,
      paddingHorizontal: 32,
      textAlign: 'center',
    },
  });
