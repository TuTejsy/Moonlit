import React, { useCallback, useMemo } from 'react';
import { Image, View } from 'react-native';

import { Icons } from '@/assets/icons/Icons';
import { PressableView } from '@/components/Primitives/PressableView/PressableView';
import { TextView } from '@/components/Primitives/TextView/TextView';
import { ShowPaywallModalType } from '@/hooks/navigation/useShowPaywallModal';
import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useVoicePreviewCachedPath } from '@/hooks/useVoicePreviewCachedPath';
import { SOURCE } from '@/services/analytics/analytics.constants';
import { selectIsFullVersion } from '@/store/user/user.selector';

import { makeStyles } from './AudioRecording.styles';
import { useAudioRecordingLayout } from './hooks/useAudioRecordingLayout';

interface AudioRecordingProps {
  coverUrl: string;
  isFree: boolean;
  isSelected: boolean;
  name: string;
  onSelect: (recordingId: number, recordingName: string) => void;
  recordingId: number;
  showPaywallModal: ShowPaywallModalType;
}

export function AudioRecording({
  coverUrl,
  isFree,
  isSelected,
  name,
  onSelect,
  recordingId,
  showPaywallModal,
}: AudioRecordingProps) {
  const audioRecordingLayout = useAudioRecordingLayout();
  const stylesContext = useMemo(
    () => ({ isSelected, ...audioRecordingLayout }),
    [audioRecordingLayout, isSelected],
  );
  const styles = useMakeStyles(makeStyles, stylesContext);

  const isFullVersion = useAppSelector(selectIsFullVersion);
  const voicePreviewCachedPath = useVoicePreviewCachedPath(coverUrl);

  const handleSelect = useCallback(() => {
    if (!isFullVersion && !isFree) {
      showPaywallModal({ contentName: name, source: SOURCE.VOICE });
    } else {
      onSelect(recordingId, name);
    }
  }, [isFree, isFullVersion, name, onSelect, recordingId, showPaywallModal]);

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
      <Image source={{ uri: voicePreviewCachedPath }} style={styles.voiceAvatar} />
      <TextView style={styles.text} type='bold'>
        {name}
      </TextView>
    </PressableView>
  );
}
