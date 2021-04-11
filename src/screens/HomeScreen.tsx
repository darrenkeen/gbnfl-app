import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Image, Text, StatusBar, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../App';
import LogoImage from '../assets/images/logo.png';
import { MainTitle } from '../components/MainTitle';
import { TrophyTable } from '../components/TrophyTable';
import { getColor, tailwind } from '../utils/tailwind';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={tailwind('bg-background-1000')}>
      <ScrollView>
        <View style={tailwind('justify-center items-center')}>
          <Image
            source={LogoImage}
            style={tailwind('w-40 h-40')}
            resizeMode="contain"
          />
        </View>
        <TrophyTable />
        <View style={tailwind('mt-10')}>
          <MainTitle title="Weekly Leaderboard" />
          <Text>uidsgauidgaiudd</Text>
          <Text>uidsgauidgaiudd</Text>
          <Text>uidsgauidgaiudd</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
