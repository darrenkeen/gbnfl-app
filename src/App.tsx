import React from 'react';
import Axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { BASE_URL } from 'react-native-dotenv';
import { View } from 'react-native';

import { HomeScreen } from './screens/HomeScreen';
import { PlayerScreen } from './screens/PlayerScreen';
import { AddTrophyScreen } from './screens/AddTrophyScreen';
import { MatchScreen } from './screens/MatchScreen';
import { SeasonScreen } from './screens/SeasonScreen';

import { getColor, tailwind } from './utils/tailwind';
import { WinScreen } from './screens/WinScreen';

export type RootStackParamList = {
  Home: undefined;
  Player: {
    uno: string;
  };
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

Axios.defaults.baseURL = BASE_URL || 'base  ';
Axios.defaults.withCredentials = true;

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => (
  <View style={tailwind('flex-1 bg-background-1000')}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: getColor('background-1000'),
            borderBottomColor: 'transparent',
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
              width: 0,
            },
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          cardStyle: { backgroundColor: getColor('background-1000') },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="Player"
          component={PlayerScreen}
          options={{ title: 'Player Stats' }}
        />
        <Stack.Screen name="AddTrophy" component={AddTrophyScreen} />
        <Stack.Screen
          name="Match"
          component={MatchScreen}
          options={{ title: 'Match Stats' }}
        />
        <Stack.Screen
          name="Season"
          component={SeasonScreen}
          options={{ title: 'Season Wins' }}
        />
        <Stack.Screen
          name="Win"
          component={WinScreen}
          options={{ title: 'Win stats' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </View>
);

export default App;
