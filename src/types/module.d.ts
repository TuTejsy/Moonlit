declare module '*.json';
declare module '*.png' {
  const value: import('react-native-fast-image').Source;
  export default value;
}
