import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { getColor } from '../utils/tailwind';
import { MainStackScreen } from './MainStack';
import { PlayerStackScreen } from './PlayerStack';
import { PlayerContextProvider } from '../context/PlayerContext';
import { HeaderRight } from '../components/HeaderRight';
import { Text } from 'react-native';

export type RootStackParamList = {
  Main: undefined;
  PlayerStack: {
    uno: string;
  };
};

const RootStack = createStackNavigator<RootStackParamList>();

export const RootStackComponent: React.FC = () => {
  return (
    <PlayerContextProvider>
      <RootStack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerStyle: {
            backgroundColor: getColor('background-1200'),
            shadowOpacity: 1,
            shadowColor: getColor('background-1200'),
            shadowRadius: 5,
          },
          headerTintColor: getColor('white'),
        }}
      >
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{
            headerTitle: () => null,
            headerRight: () => <HeaderRight />,
          }}
        />
        <RootStack.Screen
          name="PlayerStack"
          component={PlayerStackScreen}
          options={{
            headerTitle: 'Player Stats',
          }}
        />
      </RootStack.Navigator>
    </PlayerContextProvider>
  );
};
