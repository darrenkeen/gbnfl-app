import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getColor } from '../utils/tailwind';
import { LoginScreen } from '../screens/LoginScreen';

export type AuthStackParamList = {
  Login: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

export const AuthStackComponent: React.FC = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: getColor('background-1200'),
        },
        headerTintColor: getColor('white'),
      }}
    >
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login', headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};
