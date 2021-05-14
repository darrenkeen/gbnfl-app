import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { MatchScreen } from '../screens/MatchScreen';
import { PlayerMatchesScreen } from '../screens/Player/PlayerMatchesScreen';
import { getColor } from '../utils/tailwind';

export type PlayerStackParamList = {
  PlayerLatestMatches: undefined;
  PlayerMatch: {
    matchId: string;
    username: string;
  };
};

const PlayerStack = createStackNavigator<PlayerStackParamList>();

export const PlayerStackScreen = () => (
  <PlayerStack.Navigator
    screenOptions={{
      cardStyle: { backgroundColor: getColor('background-1000') },
      headerStyle: {
        backgroundColor: getColor('background-1100'),
        borderBottomColor: getColor('background-900'),
      },
      headerTitleStyle: {
        borderTopWidth: 10,
        borderTopColor: 'red',
        color: getColor('white'),
      },
      headerBackTitleStyle: {
        color: getColor('white'),
      },
      headerTintColor: getColor('white'),
    }}
  >
    <PlayerStack.Screen
      name="PlayerLatestMatches"
      component={PlayerMatchesScreen}
      options={{ headerShown: false }}
    />
    <PlayerStack.Screen
      name="PlayerMatch"
      component={MatchScreen}
      options={{ title: 'Match Stats', headerShown: false }}
    />
  </PlayerStack.Navigator>
);
