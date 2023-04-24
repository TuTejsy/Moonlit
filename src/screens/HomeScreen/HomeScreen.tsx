import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  View,
  StyleSheet,
  NativeEventEmitter,
  EmitterSubscription,
  ScrollView,
} from 'react-native';

import { noop } from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

import { useMakeStyles } from '@/hooks/theme/useMakeStyles';
import { useTheme } from '@/hooks/theme/useTheme';

import CategoriesList from './components/CategoriesList/CategoriesList';
import FeaturingList from './components/FeaturingList/FeaturingList';
import SectionHeader from './components/SectionHeader/SectionHeader';
import { makeStyles } from './HomeScreen.styles';

function HomeScreen() {
  const { colors } = useTheme();
  const styles = useMakeStyles(makeStyles);

  return (
    <LinearGradient
      angle={180}
      colors={[colors.orange, colors.black]}
      locations={[0.2, 0.8]}
      style={styles.screen}
    >
      <ScrollView style={styles.content}>
        <SectionHeader title='Featuring tales' onSeeAllPress={noop} />

        <FeaturingList />
        <CategoriesList />

        <SectionHeader title='Popular tales' onSeeAllPress={noop} />

        <SectionHeader title='All tales' onSeeAllPress={noop} />
      </ScrollView>
    </LinearGradient>
  );
}

export default HomeScreen;
