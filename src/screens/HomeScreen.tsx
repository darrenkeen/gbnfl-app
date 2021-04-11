import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import { RootStackParamList } from '../App';

import LogoImage from '../assets/images/logo.png';
import { TrophyTable } from '../components/TrophyTable';
import { Button } from '../components/Button';

import { tailwind } from '../utils/tailwind';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={tailwind('h-full bg-background-1000')}>
      <SafeAreaView style={tailwind('h-full')}>
        <View style={tailwind('justify-center items-center')}>
          <Image
            source={LogoImage}
            style={tailwind('w-40 h-40')}
            resizeMode="contain"
          />
        </View>
        <TrophyTable />
      </SafeAreaView>
    </View>
  );
};
