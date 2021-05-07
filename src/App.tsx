import React from 'react';
import Axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { BASE_URL } from 'react-native-dotenv';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { HomeScreen } from './screens/HomeScreen';
import { MatchScreen } from './screens/MatchScreen';
import { SeasonScreen } from './screens/SeasonScreen';
import { WinScreen } from './screens/WinScreen';
import { PlayerScreen } from './screens/Player/PlayerScreen';
import { PlayerSeasonScreen } from './screens/Player/PlayerSeasonScreen';
import { getColor, tailwind } from './utils/tailwind';

export type MainStackParamList = {
  Home: undefined;
  AddTrophy: undefined;
  Match: {
    matchId: string;
    username: string;
  };
  Season: {
    season: string;
  };
  Win: {
    matchDataId: string;
  };
};

export type PlayerTabParamList = {
  PlayerLifetime: {
    uno: string;
  };
  PlayerWeekly: undefined;
  PlayerSeason: undefined;
  PlayerMatches: undefined;
  PlayerWins: undefined;
};

Axios.defaults.baseURL = BASE_URL || 'base  ';
Axios.defaults.withCredentials = true;

const MainStack = createStackNavigator<MainStackParamList>();
const PlayerTab = createBottomTabNavigator<PlayerTabParamList>();
const RootStack = createNativeStackNavigator();

const MainStackScreen = () => (
  <MainStack.Navigator
    screenOptions={{
      cardStyle: { backgroundColor: getColor('background-1000') },
      headerStyle: {
        backgroundColor: getColor('background-1100'),
        borderBottomColor: getColor('background-900'),
      },
      headerTitleStyle: {
        color: getColor('white'),
      },
      headerBackTitleStyle: {
        color: getColor('gray-500'),
      },
      headerTintColor: getColor('gray-500'),
    }}
  >
    <MainStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="Match"
      component={MatchScreen}
      options={{ title: 'Match Stats' }}
    />
    <MainStack.Screen
      name="Season"
      component={SeasonScreen}
      options={{ title: 'Season Wins' }}
    />
    <MainStack.Screen
      name="Win"
      component={WinScreen}
      options={{ title: 'Win stats' }}
    />
  </MainStack.Navigator>
);

const PlayerTabScreen = () => (
  <PlayerTab.Navigator
    initialRouteName="PlayerLifetime"
    sceneContainerStyle={{ backgroundColor: getColor('background-1000') }}
    tabBarOptions={{
      activeTintColor: getColor('white'),
      inactiveTintColor: getColor('background-900'),
      labelStyle: {
        paddingBottom: 30,
      },
      style: {
        backgroundColor: getColor('background-1100'),
        borderTopColor: getColor('background-900'),
        paddingBottom: 0,
      },
    }}
  >
    <PlayerTab.Screen
      name="PlayerLifetime"
      component={PlayerScreen}
      options={{
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
      component={PlayerSeasonScreen}
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
      component={PlayerSeasonScreen}
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
      component={PlayerSeasonScreen}
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
);

const App: React.FC = () => (
  <View style={tailwind('flex-1 bg-background-1000')}>
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: getColor('background-1100'),
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
          options={{ title: 'Player' }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  </View>
);

export default App;

/*
Icons
 Lifetime: FA heartbeat
 Weekly: FA calendar-week
 Season: FA clock
 Matches: FA align-justify
 wins: FA trophy
*/
