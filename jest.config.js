module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@reduxjs/toolkit|immer|react-native-adapty)/)',
  ],
};
