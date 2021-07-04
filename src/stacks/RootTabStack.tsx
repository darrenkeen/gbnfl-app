import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Feather';
import React, { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';
import { GoalsScreen } from '../screens/GoalsScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { TrophyTableScreen } from '../screens/TrophyTableScreen';
import { WeeklyLeaderboardScreen } from '../screens/WeeklyLeaderboardScreen';
import { getColor, tailwind } from '../utils/tailwind';
import { PlayerStackScreen } from './PlayerStack';

export type RootTabStackParamList = {
  Home: undefined;
  WeeklyLeaderboard: undefined;
  PlayerStack: {
    uno: string;
  };
  Profile: undefined;
  Login: undefined;
  Goals: undefined;
};

const RootTabStack = createBottomTabNavigator<RootTabStackParamList>();

export const RootTabStackComponent: React.FC = () => {
  const { state } = useContext(AuthContext);

  return (
    <RootTabStack.Navigator
      initialRouteName="Home"
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
      <RootTabStack.Screen
        name="Home"
        component={TrophyTableScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              size={20}
              style={tailwind(focused ? 'text-white' : 'text-background-900')}
            />
          ),
        }}
      />
      <RootTabStack.Screen
        name="PlayerStack"
        component={PlayerStackScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
      <RootTabStack.Screen
        name="WeeklyLeaderboard"
        component={WeeklyLeaderboardScreen}
        options={{
          title: 'Leaderboard',
          tabBarLabel: 'Leaderboard',
          tabBarIcon: ({ focused }) => (
            <MIIcon
              name="leaderboard"
              size={20}
              style={tailwind(focused ? 'text-white' : 'text-background-900')}
            />
          ),
        }}
      />
      {state.user ? (
        <>
          <RootTabStack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: 'Profile',
              tabBarLabel: 'Profile',
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="user"
                  size={20}
                  style={tailwind(
                    focused ? 'text-white' : 'text-background-900',
                  )}
                />
              ),
            }}
          />
          <RootTabStack.Screen
            name="Goals"
            component={GoalsScreen}
            options={{
              title: 'Goals',
              tabBarLabel: 'Goals',
              tabBarIcon: ({ focused }) => (
                <FIcon
                  name="target"
                  size={20}
                  style={tailwind(
                    focused ? 'text-white' : 'text-background-900',
                  )}
                />
              ),
            }}
          />
        </>
      ) : (
        <RootTabStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Login',
            tabBarLabel: 'Login',
            tabBarIcon: ({ focused }) => (
              <Icon
                name="user"
                size={20}
                style={tailwind(focused ? 'text-white' : 'text-background-900')}
              />
            ),
          }}
        />
      )}
    </RootTabStack.Navigator>
  );
};
