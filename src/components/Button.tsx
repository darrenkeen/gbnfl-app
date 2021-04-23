import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getColor, tailwind } from '../utils/tailwind';

interface ButtonProps {
  onPress: () => void;
  title: string;
  type?: 'outline' | 'full';
  disabled?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  type = 'full',
  disabled,
  loading,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        tailwind(
          `w-full mb-5 text-white uppercase border rounded-3xl overflow-hidden ${
            type === 'full' ? 'border-red-100' : 'border-white'
          }`,
        ),
        { opacity: disabled ? 0.8 : 1 },
      ]}
      onPress={onPress}
    >
      {type === 'full' ? (
        <LinearGradient
          style={tailwind('py-3 px-4')}
          colors={[getColor('red-200'), getColor('red-100')]}
        >
          <Text
            style={tailwind(
              'text-white text-center text-base font-rubik uppercase',
            )}
          >
            {loading ? 'Please wait..' : title}
          </Text>
        </LinearGradient>
      ) : (
        <View style={tailwind('py-3')}>
          <Text
            style={tailwind(
              'text-white text-center text-base font-rubik uppercase',
            )}
          >
            {loading ? <ActivityIndicator size="small" /> : title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
