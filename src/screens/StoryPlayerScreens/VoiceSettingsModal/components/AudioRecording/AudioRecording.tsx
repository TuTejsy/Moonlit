import React, { useCallback, useMemo } from 'react';
import { Image, View } from 'react-native';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { useShowPaywallModal } from '@/hooks/navigation/useShowPaywallModal';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppSelector } from '@/hooks/useAppSelector';
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

  const { showPaywallModal } = useShowPaywallModal();

  const handleSelect = useCallback(() => {
    if (!isFullVersion && !isFree) {
      showPaywallModal();
    } else {
      onSelect(recordingId);
    }
  }, [isFree, isFullVersion, onSelect, recordingId, showPaywallModal]);

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
      <Image source={{ cache: 'force-cache', uri: coverUrl }} style={styles.voiceAvatar} />
      <TextView style={styles.text} type='bold'>
        {name}
      </TextView>
    </PressableView>
  );
}
