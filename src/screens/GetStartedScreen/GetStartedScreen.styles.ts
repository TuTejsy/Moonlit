import { StyleSheet } from 'react-native';

import _ from 'lodash';

import { WINDOW_WIDTH } from '@/constants/layout';
import { MakeStylesProps } from '@/hooks/theme/useMakeStyles';

export const makeStyles = ({ colors, dh, dw, fonts, insets }: MakeStylesProps) =>
  StyleSheet.create({
    continueButton: {
      borderColor: colors.opacityWhite(0.2),
      borderRadius: 24,
      borderWidth: 1,
      paddingHorizontal: 57,
      paddingVertical: 13,
    },
    continueText: {
      ...fonts.size_16,
      color: colors.white,
    },
    controls: {
      alignItems: 'center',
      marginBottom: dh(16),
      marginTop: dh(40),
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
      height: dw(483),
    },
    image2: {
      height: dw(540),
    },
    image3: {
      height: dw(617),
      marginTop: 0,
    },
    indicatorsContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: dh(17),
      marginTop: dh(19),
    },
    screen: {
      alignItems: 'flex-start',
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: insets.bottom,
    },
    stepContainer: {
      alignItems: 'center',
      width: WINDOW_WIDTH,
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
