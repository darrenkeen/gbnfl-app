import React from 'react';
import { View, Image, ScrollView, Text } from 'react-native';

import LogoImage from '../assets/images/logo.png';
import { tailwind } from '../utils/tailwind';

export const ProfileScreen: React.FC = () => {
  return (
    <ScrollView style={tailwind('pt-10')}>
      <View style={tailwind('justify-center items-center')}>
        <Image
          source={LogoImage}
          style={tailwind('w-40 h-40')}
          resizeMode="contain"
        />
      </View>
      <Text>Edit your profile</Text>
    </ScrollView>
  );
};
