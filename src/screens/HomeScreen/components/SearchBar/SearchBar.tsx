import React, { useCallback, useMemo, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { ScrollShadow } from '@/components/Primitives/ScrollShadow/ScrollShadow';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';
import { useScrollOpacity } from '@/hooks/useScrollOpacity';

import {
  CLOSE_BUTTON_MARGIN_LEFT,
  CLOSE_BUTTON_WIDTH,
  SEARCH_BAR_BLURED_WIDTH,
  SEARCH_BAR_FOCUSED_WIDTH,
} from './SearchBar.constants';
import { makeStyles } from './SearchBar.styles';

interface SearchBarPropTypes {
  onChangeText: (text: string) => void;
  value: string;
  onInputBlur?: () => void;
  onInputFocus?: () => void;
  opacityAnimStyle?: ReturnType<typeof useScrollOpacity>['opacityAnimStyle'];
}

export const SearchBar = React.memo(
  ({ onChangeText, onInputBlur, onInputFocus, opacityAnimStyle, value }: SearchBarPropTypes) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const hasSearchText = !!value;

    const stylesContext = useMemo(
      () => ({ hasSearchText, isInputFocused }),
      [isInputFocused, hasSearchText],
    );

    const styles = useMakeStyles(makeStyles, stylesContext);
    const { colors } = useTheme();

    const inputRef = useRef<TextInput | null>(null);
    const isInputFocusedSharedValue = useSharedValue(0);

    const inputContainerAnimatedStyle = useAnimatedStyle(() => ({
      width: interpolate(
        isInputFocusedSharedValue.value,
        [0, 1],
        [SEARCH_BAR_BLURED_WIDTH, SEARCH_BAR_FOCUSED_WIDTH],
        Extrapolation.CLAMP,
      ),
    }));

    const closeButtonAnimatedStyle = useAnimatedStyle(() => ({
      display: isInputFocusedSharedValue.value === 0 ? 'none' : 'flex',
      marginLeft: CLOSE_BUTTON_MARGIN_LEFT,
      opacity: isInputFocusedSharedValue.value,
      width: CLOSE_BUTTON_WIDTH,
    }));

    const handleInputFocus = useCallback(() => {
      setIsInputFocused(true);
      isInputFocusedSharedValue.value = withTiming(1);

      onInputFocus?.();
    }, [isInputFocusedSharedValue, onInputFocus]);

    const handleInputBlur = useCallback(() => {
      setIsInputFocused(false);
      isInputFocusedSharedValue.value = withTiming(0);

      onInputBlur?.();
    }, [isInputFocusedSharedValue, onInputBlur]);

    const handleCloseButtonPress = useCallback(() => {
      inputRef.current?.blur();
    }, []);

    const handleRemovePress = useCallback(() => {
      inputRef.current?.clear();
      onChangeText('');
    }, [onChangeText]);

    return (
      <View style={styles.searchBar}>
        <View style={styles.contentContainer}>
          <ScrollShadow opacityAnimStyle={opacityAnimStyle} />

          <Animated.View style={[styles.inputContainer, inputContainerAnimatedStyle]}>
            <Animated.View style={[styles.blurContainer, opacityAnimStyle]}>
              <BlurView
                blurAmount={5}
                blurRadius={5}
                blurType='dark'
                overlayColor={colors.black}
                reducedTransparencyFallbackColor={colors.opacityBlack(0.2)}
                style={styles.inputBlur}
              />
            </Animated.View>

            <Icons.Search style={styles.searchIcon} />
            <TextInput
              ref={inputRef}
              cursorColor={colors.white}
              keyboardAppearance='dark'
              placeholder='Look for stories'
              placeholderTextColor={colors.opacityWhite(0.4)}
              returnKeyType='search'
              selectionColor={colors.white}
              style={styles.textInput}
              value={value}
              onBlur={handleInputBlur}
              onChangeText={onChangeText}
              onFocus={handleInputFocus}
            />

            {!!value && <Icons.RoundClose style={styles.closeIcon} onPress={handleRemovePress} />}
          </Animated.View>
          <Animated.View style={closeButtonAnimatedStyle}>
            <PressableView style={styles.closeButton} onPress={handleCloseButtonPress}>
              <TextView style={styles.closeButtonText} type='bold'>
                Close
              </TextView>
            </PressableView>
          </Animated.View>
        </View>
      </View>
    );
  },
);
