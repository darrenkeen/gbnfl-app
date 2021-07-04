import React from 'react';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { getColor, tailwind } from '../utils/tailwind';

interface GradientTitleProps {
  title: string;
}

export const GradientTitle: React.FC<GradientTitleProps> = ({ title }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[getColor('background-500'), getColor('background-400')]}
      style={tailwind('mb-5 px-5 py-4 border-t border-b border-background-500')}
    >
      <Text style={tailwind('text-center text-white uppercase')}>{title}</Text>
    </LinearGradient>
  );
};
