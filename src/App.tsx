import React from 'react';
import Axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { BASE_URL } from 'react-native-dotenv';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { tailwind } from './utils/tailwind';
import { NavigationControl } from './components/NavigationControl';
import { AuthContextProvider } from './context/AuthContext';

console.log(BASE_URL);

Axios.defaults.baseURL = BASE_URL || 'base  ';
Axios.defaults.withCredentials = true;

const App: React.FC = () => (
  <SafeAreaProvider>
    <View style={tailwind('flex-1 bg-background-1000')}>
      <AuthContextProvider>
        <NavigationContainer>
          <NavigationControl />
        </NavigationContainer>
      </AuthContextProvider>
    </View>
  </SafeAreaProvider>
);

export default App;
