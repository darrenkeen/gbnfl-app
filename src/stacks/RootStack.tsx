import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { getColor } from '../utils/tailwind';
import { MainStackScreen } from './MainStack';
import { PlayerStackScreen } from './PlayerStack';
import { PlayerContextProvider } from '../context/PlayerContext';
import { HeaderRight } from '../components/HeaderRight';
import { ProfileScreen } from '../screens/ProfileScreen';

export type RootStackParamList = {
  Main: undefined;
  PlayerStack: {
    uno: string;
  };
  Profile: undefined;
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
          headerRight: () => <HeaderRight />,
          headerTintColor: getColor('white'),
        }}
      >
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="PlayerStack"
          component={PlayerStackScreen}
          options={{
            headerShown: false,
            headerTitle: 'Player Stats',
          }}
        />
        <RootStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerTitle: 'Edit Profile',
            cardStyle: { backgroundColor: getColor('background-1000') },
          }}
        />
      </RootStack.Navigator>
    </PlayerContextProvider>
  );
};
