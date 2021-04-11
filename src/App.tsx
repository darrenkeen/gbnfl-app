import React from 'react';
import Axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { HomeScreen } from './screens/HomeScreen';
import { PlayerScreen } from './screens/PlayerScreen';

import { getColor, tailwind } from './utils/tailwind';
import { View } from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Player: undefined;
};

Axios.defaults.baseURL = 'http://localhost:5000/api/v1';
Axios.defaults.withCredentials = true;

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => (
  <View style={tailwind('flex-1')}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: getColor('background-1000'),
            borderBottomColor: 'transparent',
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
              width: 0,
            },
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen name="Player" component={PlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </View>
);

export default App;
