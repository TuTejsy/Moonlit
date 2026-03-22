/**
 * @format
 */

import 'react-native-get-random-values';

import { AppRegistry } from 'react-native';

import App from './App';
import { name as appName } from './app.json';

if (__DEV__) {
  // eslint-disable-next-line global-require
  require('./ReactotronConfig');
}

AppRegistry.registerComponent(appName, () => App);
