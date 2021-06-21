import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { RootStackComponent } from '../stacks/RootStack';
import { AuthStackComponent } from '../stacks/AuthStack';
import { SplashScreen } from '../screens/SplashScreen';

export const NavigationControl: React.FC = () => {
  const {
    state: { user, isLoading },
  } = useContext(AuthContext);
  return isLoading ? (
    <SplashScreen />
  ) : user ? (
    <RootStackComponent />
  ) : (
    <AuthStackComponent />
  );
};
