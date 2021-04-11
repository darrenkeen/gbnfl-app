import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../App';
import LogoImage from '../assets/images/logo.png';
import { TrophyTable } from '../components/TrophyTable';
import { WeeklyFeature } from '../components/WeeklyFeature';
import { tailwind } from '../utils/tailwind';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const HomeScreen: React.FC<Props> = () => {
  return (
    <SafeAreaView style={tailwind('bg-background-1000 flex-1')}>
      <ScrollView>
        <View style={tailwind('justify-center items-center')}>
          <Image
            source={LogoImage}
            style={tailwind('w-40 h-40')}
            resizeMode="contain"
          />
        </View>
        <TrophyTable />
        <WeeklyFeature />
      </ScrollView>
    </SafeAreaView>
  );
};
