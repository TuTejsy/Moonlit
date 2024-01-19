import { useCallback, useEffect, useState } from 'react';

import { selectIsFullVersion } from '@/store/user/user.selector';

import { useAppSelector } from './useAppSelector';
import { useMutableValue } from './useMutableValue';

export const useRenderVersion = (version = 0) => {
  const isFullVersion = useAppSelector(selectIsFullVersion);

  const [renderVersion, setRenderVersion] = useState(0);
  const renderVerisonRef = useMutableValue(renderVersion);

  const increaseRenderVersion = useCallback(() => {
    setRenderVersion(renderVerisonRef.current + 1);
  }, [renderVerisonRef]);

  useEffect(() => {
    increaseRenderVersion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullVersion]);

  return { increaseRenderVersion, renderVersion: renderVersion + version };
};
