/* eslint-disable class-methods-use-this */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { localizedResources } from './locals';
import { AppLocalizeFunctionOptions, LocalizedResources, LocalsNamespace } from './types';

import 'intl-pluralrules';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  lng: 'en',
  resources: localizedResources,
});

class Localization {
  translate<T extends LocalsNamespace>(
    ns: T,
    key: keyof LocalizedResources[T],
    options: AppLocalizeFunctionOptions = {},
  ) {
    return i18n.t(key as string, { ns, ...options });
  }
}

export const localization = new Localization();

export default i18n;
