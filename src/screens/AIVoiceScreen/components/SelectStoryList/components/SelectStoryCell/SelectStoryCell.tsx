import React, { useCallback, useMemo } from 'react';
import { Image, View } from 'react-native';

import { Icons } from '@/assets/icons/Icons';
import loonImage from '@/assets/images/moon/moon.png';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useShowPaywallModal } from '@/hooks/navigation/useShowPaywallModal';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppSelector } from '@/hooks/useAppSelector';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { selectIsFullVersion } from '@/store/user/user.selector';

import { TEST_ID_SELECT_STORY_CELL } from '../../SelectStoryList.constants';

import { SelectStoryCellStyleContext, makeStyles } from './SelectStoryCell.styles';
import { SelectStoryCellProps } from './SelectStoryCell.types';

export const SelectStoryCell = React.memo(
  ({ isFree, isSelected, onPress, previewURL, storyId, title }: SelectStoryCellProps) => {
    const isFullVersion = useAppSelector(selectIsFullVersion);
    const styleContext = useMemo<SelectStoryCellStyleContext>(() => ({ isSelected }), [isSelected]);
    const styles = useMakeStyles(makeStyles, styleContext);

    const { showPaywallModal } = useShowPaywallModal();

    const handlePress = useCallback(() => {
      if (isFree || isFullVersion) {
        onPress(storyId);
      } else {
        showPaywallModal({ contentName: 'Promotion banner', source: SOURCE.AI_VOICE_SCREEN });
      }
    }, [isFree, isFullVersion, onPress, showPaywallModal, storyId]);

    const showLockIcon = !isFree && !isFullVersion && !isSelected;

    return (
      <View>
        <PressableView
          style={styles.cardContainer}
          testID={TEST_ID_SELECT_STORY_CELL}
          onPress={handlePress}
        >
          <Image
            blurRadius={!previewURL ? 10 : 0}
            defaultSource={loonImage}
            resizeMode={previewURL ? 'cover' : 'center'}
            source={{ uri: previewURL }}
            style={styles.preview}
          />
          {showLockIcon && <Icons.Lock style={styles.lockIcon} />}
        </PressableView>
        <TextView numberOfLines={2} style={styles.titleText} type='medium'>
          {title}
        </TextView>
      </View>
    );
  },
);

SelectStoryCell.displayName = 'SelectStoryCell';
