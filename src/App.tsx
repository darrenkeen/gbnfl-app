import React from 'react';
import Axios from 'axios';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { BASE_URL } from 'react-native-dotenv';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { PlayerContextProvider } from './context/PlayerContext';
import { HomeScreen } from './screens/HomeScreen';
import { MatchScreen } from './screens/MatchScreen';
import { SeasonScreen } from './screens/SeasonScreen';
import { WinScreen } from './screens/WinScreen';
import { PlayerLifetimeScreen } from './screens/Player/PlayerLifetimeScreen';
import { PlayerWinsScreen } from './screens/Player/PlayerWinsScreen';
import { PlayerSeasonScreen } from './screens/Player/PlayerSeasonScreen';
import { PlayerWeeklyScreen } from './screens/Player/PlayerWeeklyScreen';
import { PlayerMatchesScreen } from './screens/Player/PlayerMatchesScreen';
import { getColor, tailwind } from './utils/tailwind';

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

export type PlayerTabParamList = {
  PlayerLifetime: {
    uno: string;
  };
  PlayerWeekly: undefined;
  PlayerSeason: undefined;
  PlayerMatches: undefined;
  PlayerWins: undefined;
};

export type PlayerStackParamList = {
  PlayerLatestMatches: undefined;
  PlayerMatch: {
    matchId: string;
  };
};

export type RootStackParamList = {
  Main: undefined;
  PlayerTab: NavigatorScreenParams<PlayerTabParamList>;
};

Axios.defaults.baseURL = BASE_URL || 'base  ';
Axios.defaults.withCredentials = true;

const MainStack = createStackNavigator<MainStackParamList>();
const PlayerStack = createStackNavigator<PlayerStackParamList>();
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

const PlayerStackScreen = () => (
  <PlayerStack.Navigator
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

const PlayerTabScreen = () => (
  <PlayerContextProvider>
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
          options={{ title: 'Player Stats' }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  </View>
);

export default App;
