import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getColor } from '../utils/tailwind';
import { MainStackScreen } from './MainStack';
import { PlayerStackScreen } from './PlayerStack';
import { PlayerContextProvider } from '../context/PlayerContext';

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
          },
          headerTintColor: getColor('white'),
        }}
      >
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ title: 'Home', headerShown: false }}
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
