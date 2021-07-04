import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { RootStackComponent } from '../stacks/RootStack';
import { SplashScreen } from '../screens/SplashScreen';

export const NavigationControl: React.FC = () => {
  const {
    state: { isLoading },
  } = useContext(AuthContext);
  return isLoading ? <SplashScreen /> : <RootStackComponent />;
};
