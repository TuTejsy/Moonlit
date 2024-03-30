import React from 'react';
import { Keyboard, Pressable, ViewProps } from 'react-native';

export const DissmisableView = (props: ViewProps) => (
  <Pressable onPress={Keyboard.dismiss} {...props} />
);
