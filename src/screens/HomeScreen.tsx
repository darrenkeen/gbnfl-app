import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Image, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';

import { PlayerTabParamList, RootStackParamList } from '../App';
import LogoImage from '../assets/images/logo.png';
import { TrophyTable } from '../components/TrophyTable';
import { WeeklyFeature } from '../components/WeeklyFeature';
import { tailwind } from '../utils/tailwind';

export type HomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<PlayerTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

export const HomeScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  const onEndRefresh = () => {
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={tailwind('bg-background-1000 flex-1')}>
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
        <WeeklyFeature />
      </ScrollView>
    </SafeAreaView>
  );
};
