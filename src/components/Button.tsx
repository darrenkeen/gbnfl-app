import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getColor, tailwind } from '../utils/tailwind';

interface ButtonProps {
  onPress: () => void;
  title: string;
}

export const Button: React.FC<ButtonProps> = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      style={tailwind(
        'w-full mb-10 font-bold text-white uppercase border border-red-100 rounded-3xl overflow-hidden',
      )}
      onPress={onPress}
    >
      <LinearGradient
        style={tailwind('py-3')}
        colors={[getColor('red-200'), getColor('red-100')]}
      >
        <Text style={tailwind('text-white text-center text-base')}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
