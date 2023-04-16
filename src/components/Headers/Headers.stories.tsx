import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ComponentMeta, ComponentStory } from '@storybook/react-native';

import { ModalHeader } from './ModalHeader/ModalHeader';
import { ScreenHeader } from './ScreenHeader/ScreenHeader';
import { SearchHeader } from './SearchHeader/SearchHeader';

type Component = typeof ScreenHeader;

export default {
  args: {
    title: 'Some Title',
  },
  decorators: [
    (Story) => (
      <View style={styles.storyWrapper}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    notes: 'Components from src/components',
  },
  title: 'Header',
} as ComponentMeta<Component>;

const DefaultHeaderTemplate: ComponentStory<Component> = (args) => (
  <ScreenHeader {...args} renderLeft={args.renderLeft ? undefined : null} />
);
export const Default = DefaultHeaderTemplate.bind({});
Default.args = { renderLeft: true };

const SearchHeaderTemplate: ComponentStory<Component> = (args) => <SearchHeader {...args} />;
export const Search = SearchHeaderTemplate.bind({});

const ModalHeaderTemplate: ComponentStory<Component> = (args) => <ModalHeader {...args} />;
export const Modal = ModalHeaderTemplate.bind({});

const styles = StyleSheet.create({
  storyWrapper: {
    maxWidth: 400,
    width: '100%',
  },
});
