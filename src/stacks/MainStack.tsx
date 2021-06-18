import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getColor } from '../utils/tailwind';
import { HomeScreen } from '../screens/HomeScreen';
import { SeasonScreen } from '../screens/SeasonScreen';
import { WinScreen } from '../screens/WinScreen';

export type MainStackParamList = {
  Home: undefined;
  AddTrophy: undefined;
  Season: {
    season: string;
  };
  Win: {
    matchDataId: string;
  };
};

const MainStack = createStackNavigator<MainStackParamList>();

export const MainStackScreen = () => (
  <MainStack.Navigator
    screenOptions={{
      cardStyle: { backgroundColor: getColor('background-1000') },
      headerStyle: {
        backgroundColor: getColor('background-1200'),
      },
      headerTitleStyle: {
        color: getColor('white'),
      },
      headerBackTitleStyle: {
        color: getColor('white'),
      },
      headerTintColor: getColor('white'),
    }}
  >
    <MainStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    {/* <MainStack.Screen
      name="Season"
      component={SeasonScreen}
      options={{ title: 'Season Wins' }}
    />
    <MainStack.Screen
      name="Win"
      component={WinScreen}
      options={{ title: 'Win stats' }}
    /> */}
  </MainStack.Navigator>
);
