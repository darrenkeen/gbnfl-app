import React from 'react';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';

import { tailwind } from '../../utils/tailwind';

export const PlayerSeasonScreen: React.FC = () => {
  return (
    <SafeAreaView style={tailwind('h-full')}>
      <ScrollView style={tailwind('pt-10')}>
        <View style={tailwind('mb-10')}>
          <Text
            style={tailwind(
              'text-2xl font-bold text-white text-center font-rubik',
            )}
          >
            Player screen 2
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
