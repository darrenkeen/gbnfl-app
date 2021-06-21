import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getColor } from '../utils/tailwind';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { HeaderRight } from '../components/HeaderRight';

export type MainStackParamList = {
  Home: undefined;
  AddTrophy: undefined;
  Profile: undefined;
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
        shadowOpacity: 1,
        shadowColor: getColor('background-1200'),
        shadowRadius: 5,
      },
      headerTitleStyle: {
        color: getColor('white'),
      },
      headerBackTitleStyle: {
        color: getColor('white'),
      },
      headerTintColor: getColor('white'),
      headerRight: () => <HeaderRight />,
    }}
  >
    <MainStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerTitle: '' }}
    />
    {/*
    <MainStack.Screen
      name="Win"
      component={WinScreen}
      options={{ title: 'Win stats' }}
    /> */}
  </MainStack.Navigator>
);
