import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getColor, tailwind } from '../utils/tailwind';

interface ButtonProps {
  onPress: () => void;
  title: string;
  type?: 'outline' | 'full';
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  type = 'full',
}) => {
  return (
    <TouchableOpacity
      style={tailwind(
        `w-full mb-5 text-white uppercase border rounded-3xl overflow-hidden ${
          type === 'full' ? 'border-red-100' : 'border-white'
        }`,
      )}
      onPress={onPress}
    >
      {type === 'full' ? (
        <LinearGradient
          style={tailwind('py-3')}
          colors={[getColor('red-200'), getColor('red-100')]}
        >
          <Text style={tailwind('text-white text-center text-base font-rubik')}>
            {title}
          </Text>
        </LinearGradient>
      ) : (
        <View style={tailwind('py-3')}>
          <Text style={tailwind('text-white text-center text-base font-rubik')}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
