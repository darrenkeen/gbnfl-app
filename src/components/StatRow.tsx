import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { getColor, tailwind } from '../utils/tailwind';

interface StatRowProps {
  label: string;
  value: string;
  name: string;
}

export const StatRow: React.FC<StatRowProps> = ({ label, value, name }) => {
  return (
    <LinearGradient
      colors={[getColor('background-500'), getColor('background-400')]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={tailwind(
        'w-full px-5 py-2 mb-5 flex-row justify-center items-center',
      )}
    >
      <View style={tailwind('flex-1')}>
        <Text style={tailwind('text-lg text-white font-rubik')}>{name}</Text>
      </View>
      <View>
        <Text style={tailwind('text-lg font-rubik-bold text-white text-right')}>
          {value}{' '}
        </Text>
        <Text style={tailwind('font-rubik-light text-gray-400 uppercase')}>
          {label}
        </Text>
      </View>
    </LinearGradient>
  );
};
