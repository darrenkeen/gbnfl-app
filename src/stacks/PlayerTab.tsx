import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { PlayerContextProvider } from '../context/PlayerContext';
import { PlayerLifetimeScreen } from '../screens/Player/PlayerLifetimeScreen';
import { PlayerSeasonScreen } from '../screens/Player/PlayerSeasonScreen';
import { PlayerWeeklyScreen } from '../screens/Player/PlayerWeeklyScreen';
import { PlayerWinsScreen } from '../screens/Player/PlayerWinsScreen';
import { getColor, tailwind } from '../utils/tailwind';
import { PlayerStackScreen } from './PlayerStack';

export type PlayerTabParamList = {
  PlayerLifetime: {
    uno: string;
  };
  PlayerWeekly: undefined;
  PlayerSeason: undefined;
  PlayerMatches: undefined;
  PlayerWins: undefined;
};

const PlayerTab = createBottomTabNavigator<PlayerTabParamList>();

export const PlayerTabScreen = () => (
  <PlayerContextProvider>
    <PlayerTab.Navigator
      initialRouteName="PlayerLifetime"
      sceneContainerStyle={{
        backgroundColor: getColor('background-1000'),
      }}
      tabBarOptions={{
        activeTintColor: getColor('white'),
        inactiveTintColor: getColor('background-900'),
        labelStyle: {
          paddingBottom: 5,
        },
        style: {
          backgroundColor: getColor('background-1200'),
          borderTopColor: getColor('background-900'),
          paddingTop: 10,
        },
      }}
    >
      <PlayerTab.Screen
        name="PlayerLifetime"
        component={PlayerLifetimeScreen}
        options={{
          title: 'Lifeteime',
          tabBarLabel: 'Lifetime',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="heartbeat"
              size={20}
              style={tailwind(focused ? 'text-white' : 'text-background-900')}
            />
          ),
        }}
      />
      <PlayerTab.Screen
        name="PlayerWeekly"
        component={PlayerWeeklyScreen}
        options={{
          tabBarLabel: 'Weekly',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="calendar-week"
              size={20}
              style={tailwind(focused ? 'text-white' : 'text-background-900')}
            />
          ),
        }}
      />
      <PlayerTab.Screen
        name="PlayerSeason"
        component={PlayerSeasonScreen}
        options={{
          tabBarLabel: 'Season',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="clock"
              size={20}
              style={tailwind(focused ? 'text-white' : 'text-background-900')}
            />
          ),
        }}
      />
      <PlayerTab.Screen
        name="PlayerMatches"
        component={PlayerStackScreen}
        options={{
          tabBarLabel: 'Matches',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="align-justify"
              size={20}
              style={tailwind(focused ? 'text-white' : 'text-background-900')}
            />
          ),
        }}
      />
      <PlayerTab.Screen
        name="PlayerWins"
        component={PlayerWinsScreen}
        options={{
          tabBarLabel: 'Wins',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="trophy"
              size={20}
              style={tailwind(focused ? 'text-white' : 'text-background-900')}
            />
          ),
        }}
      />
    </PlayerTab.Navigator>
  </PlayerContextProvider>
);
