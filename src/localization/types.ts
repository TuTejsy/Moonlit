import { TOptions } from 'i18next';

import { localizedResources } from './locals';

export type LocalizedResources = (typeof localizedResources)['en'];
export type LocalsNamespace = keyof (typeof localizedResources)['en'];

export interface AppLocalizeFunctionOptions extends Pick<TOptions, 'count'> {
  data?: string | number;
}

export type AppLocalizeFunction = <T extends LocalsNamespace>(
  ns: T,
  key: keyof LocalizedResources[T],
  options?: AppLocalizeFunctionOptions,
) => string;
