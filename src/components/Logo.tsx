import React from 'react';
import { View, Image } from 'react-native';

import LogoImage from '../assets/images/logo.png';

export const Logo: React.FC<any> = (...props) => {
  return (
    <View {...props}>
      <Image source={LogoImage} style={{ backgroundColor: 'transparent' }} />
    </View>
  );
};
