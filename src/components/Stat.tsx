import React from 'react';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getColor, tailwind } from '../utils/tailwind';

interface InputGroupProps {
  value: string;
  name: string;
}

export const Stat: React.FC<InputGroupProps> = ({ value, name }) => {
  return (
    <LinearGradient
      colors={[getColor('background-600'), getColor('background-700')]}
      style={tailwind('px-5 py-2 drop-shadow-lg rounded-xl')}
    >
      <Text style={tailwind('text-xl font-rubik-bold text-white text-center')}>
        {value}
      </Text>
      <Text
        style={tailwind(
          'text-gray-400 uppercase text-base font-rubik-light text-center',
        )}
      >
        {name}
      </Text>
    </LinearGradient>
  );
};
