import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getColor, tailwind } from '../utils/tailwind';
import { NavigatorScreenParams } from '@react-navigation/native';
import { MainStackScreen } from './MainStack';
import { PlayerTabParamList, PlayerTabScreen } from './PlayerTab';
import { SafeAreaView } from 'react-native';

export type RootStackParamList = {
  Main: undefined;
  PlayerTab: NavigatorScreenParams<PlayerTabParamList>;
};

const RootStack = createStackNavigator<RootStackParamList>();

export const RootStackComponent: React.FC = () => {
  return (
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
        name="PlayerTab"
        component={PlayerTabScreen}
        options={{ title: 'Player Stats' }}
      />
    </RootStack.Navigator>
  );
};
