import React from 'react';
import { Pressable, PressableProps } from 'react-native';

export interface PressableViewProps extends PressableProps {}

export const PressableView = (props: PressableViewProps) => {
  return <Pressable accessible={false} {...props} />;
};
