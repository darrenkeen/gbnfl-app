import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Image, ScrollView, RefreshControl } from 'react-native';

import LogoImage from '../assets/images/logo.png';
import { TrophyTable } from '../components/TrophyTable';
import { PlayerTabParamList } from '../stacks/PlayerTab';
import { RootStackParamList } from '../stacks/RootStack';
import { tailwind } from '../utils/tailwind';

export type TrophyTableNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<PlayerTabParamList>,
  StackNavigationProp<RootStackParamList>
>;

export const TrophyTableScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  const onEndRefresh = () => {
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={tailwind('pt-10')}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={tailwind('justify-center items-center')}>
        <Image
          source={LogoImage}
          style={tailwind('w-40 h-40')}
          resizeMode="contain"
        />
      </View>
      <TrophyTable refreshing={refreshing} onEndRefresh={onEndRefresh} />
    </ScrollView>
  );
};
