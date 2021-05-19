import React from 'react';
import Axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { BASE_URL } from 'react-native-dotenv';
import { View } from 'react-native';

import { tailwind } from './utils/tailwind';
import { RootStackComponent } from './stacks/RootStack';

console.log(BASE_URL);

Axios.defaults.baseURL = BASE_URL || 'base  ';
Axios.defaults.withCredentials = true;

const App: React.FC = () => (
  <View style={tailwind('flex-1 bg-background-1000')}>
    <NavigationContainer>
      <RootStackComponent />
    </NavigationContainer>
  </View>
);

export default App;
