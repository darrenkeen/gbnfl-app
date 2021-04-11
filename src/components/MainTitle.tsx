import React from 'react';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getColor, tailwind } from '../utils/tailwind';

interface MainTitleProps {
  title: string;
}

export const MainTitle: React.FC<MainTitleProps> = ({ title }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[getColor('red-100'), getColor('red-200')]}
      style={tailwind('px-5 py-3 mb-10')}
    >
      <Text style={tailwind('text-xl text-center text-white font-rubik')}>
        {title}
      </Text>
    </LinearGradient>
  );
};
