import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';

import { AnalyticsService } from '@/services/analytics/analytics';
import { SOURCE } from '@/services/analytics/analytics.constants';

export const useLogAppLaunch = () => {
  const wasInBackgroundRef = useRef(false);

  useEffect(() => {
    AnalyticsService.logLaunchAppEvent({ source: SOURCE.COLD_START });

    AppState.addEventListener('change', (state) => {
      switch (state) {
        case 'background': {
          wasInBackgroundRef.current = true;
          break;
        }

        case 'active': {
          if (wasInBackgroundRef.current) {
            AnalyticsService.logLaunchAppEvent({ source: SOURCE.HOT_START });
            wasInBackgroundRef.current = false;
          }
          break;
        }
        default: {
          break;
        }
      }
    });
  }, []);
};
