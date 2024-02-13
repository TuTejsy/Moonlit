export const commonColors = {
  black: '#000000',
  grey: '#D9D9D9',
  opacityBlack: (float: number) => `rgba(0, 0, 0, ${float})`,
  opacityGrey: (float: number) => `rgba(217, 217, 217, ${float})`,
  opacityWhite: (float: number) => `rgba(255, 255, 255, ${float})`,
  red: '#FF4646',
  shadow: 'rgba(92, 95, 102, 0.1)',

  shadowDropIn: 'rgba(41, 44, 51, 0.04)',
  shadowDropOut: 'rgba(41, 44, 51, 0.08)',
  transparent: 'transparent',
  unlockButtonGradientEnd: 'rgba(205, 160, 243, 1)',

  unlockButtonGradientMiddle: 'rgba(162, 67, 239, 1)',
  unlockButtonGradientStart: 'rgba(212, 75, 237, 1)',
  white: '#FFFFFF',
};
