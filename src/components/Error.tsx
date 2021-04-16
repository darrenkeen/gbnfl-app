import React from 'react';
import { Text, View } from 'react-native';
import { tailwind } from '../utils/tailwind';

interface ErrorProps {
  message: string;
}

export const Error: React.FC<ErrorProps> = ({ message }) => (
  <View>
    <Text style={tailwind('text-white')}>{message}</Text>
  </View>
);
