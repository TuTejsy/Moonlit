module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
        },
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        root: ['./src'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
  presets: ['module:@react-native/babel-preset'],
};
