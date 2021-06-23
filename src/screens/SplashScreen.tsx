import React from 'react';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loader } from '../components/Loader';

import LogoImage from '../assets/images/logo.png';
import { tailwind } from '../utils/tailwind';

export const SplashScreen: React.FC = () => {
  return (
    <SafeAreaView style={tailwind('bg-background-1000 flex-1')}>
      <View style={tailwind('justify-center items-center')}>
        <Image
          source={LogoImage}
          style={tailwind('w-40 h-40')}
          resizeMode="contain"
        />
      </View>
      <View>
        <Loader />
      </View>
    </SafeAreaView>
  );
};
