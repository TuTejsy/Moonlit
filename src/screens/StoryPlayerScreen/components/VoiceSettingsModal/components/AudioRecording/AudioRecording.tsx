import React, { useCallback, useMemo } from 'react';
import { Image, View } from 'react-native';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppNavigation } from '@/navigation/hooks/useAppNavigation';
import { RootRoutes } from '@/navigation/RootNavigator/RootNavigator.routes';
import { selectIsFullVersion } from '@/store/user/user.selector';

import { makeStyles } from './AudioRecording.styles';

interface AudioRecordingProps {
  coverUrl: string;
  isFree: boolean;
  isSelected: boolean;
  name: string;
  onSelect: (recordingId: number) => void;
  recordingId: number;
}

export function AudioRecording({
  coverUrl,
  isFree,
  isSelected,
  name,
  onSelect,
  recordingId,
}: AudioRecordingProps) {
  const stylesContext = useMemo(() => ({ isSelected }), [isSelected]);
  const styles = useMakeStyles(makeStyles, stylesContext);

  const isFullVersion = useAppSelector(selectIsFullVersion);

  const navigation = useAppNavigation();

  const handleSelect = useCallback(() => {
    if (!isFullVersion && !isFree) {
      navigation.navigate(RootRoutes.PAYWALL_MODAL);
    } else {
      onSelect(recordingId);
    }
  }, [isFree, isFullVersion, navigation, onSelect, recordingId]);

  return (
    <PressableView style={styles.audioRecordingContainer} onPress={handleSelect}>
      <View style={styles.indicatorsContainer}>
        {isSelected ? (
          <>
            {isFree && !isFullVersion && (
              <TextView style={styles.freeLabel} type='medium'>
                Free
              </TextView>
            )}
            <Icons.Check style={styles.rightIcon} />
          </>
        ) : (
          !isFree && !isFullVersion && <Icons.Lock style={styles.rightIcon} />
        )}
      </View>
      <Image source={{ uri: coverUrl }} style={styles.voiceAvatar} />
      <TextView style={styles.text} type='bold'>
        {name}
      </TextView>
    </PressableView>
  );
}
