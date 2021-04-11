import React from 'react';
import { SafeAreaView, View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { tailwind } from '../utils/tailwind';
import { RootStackParamList } from '../App';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export const PlayerScreen: React.FC<Props> = () => {
  return (
    <SafeAreaView style={tailwind('h-full')}>
      <View style={tailwind('pt-12 bg-dullGreen-500 items-center h-full')}>
        <View style={tailwind('bg-blue-200 px-3 py-1 rounded-full')}>
          <Text style={tailwind('text-blue-800 font-semibold')}>
            Player Screen
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
