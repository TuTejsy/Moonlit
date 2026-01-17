import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { localization } from './localization';
import { AppLocalizeFunction, AppLocalizeFunctionOptions } from './types';

export const useAppLocalization = () => {
  const { t } = useTranslation();

  const localize: AppLocalizeFunction = useCallback(
    (ns, key, options: AppLocalizeFunctionOptions = {}) => {
      return t(key as string, { ns, ...options });
    },
    [t],
  );

  return { localize, localization };
};
