import React from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { tailwind } from '../utils/tailwind';

export const Loader = () => (
  <View style={tailwind('my-5')}>
    <ActivityIndicator size="large" />
    <Text
      style={tailwind('font-rubik text-gray-400 text-base text-center mt-2')}
    >
      Loading...
    </Text>
  </View>
);
