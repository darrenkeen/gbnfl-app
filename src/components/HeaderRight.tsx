import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { tailwind } from '../utils/tailwind';

export const HeaderRight: React.FC = () => {
  return (
    <View style={tailwind('pr-5')}>
      <Icon name="person" size={30} color="white" />
    </View>
  );
};
