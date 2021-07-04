import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { PlayerContextProvider } from '../context/PlayerContext';
import { RootTabStackComponent } from './RootTabStack';
import { EditGoalsModal } from '../screens/EditGoalsModal';
import { getColor } from '../utils/tailwind';

export type RootStackParamList = {
  Main: undefined;
  Modal: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export const RootStackComponent: React.FC = () => {
  return (
    <PlayerContextProvider>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={RootTabStackComponent}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Modal"
          component={EditGoalsModal}
          options={{
            cardStyle: {
              backgroundColor: getColor('background-1000'),
            },
            headerStyle: {
              backgroundColor: getColor('background-1200'),
              shadowColor: 'transparent',
            },
            headerTitle: '',
            headerBackTitleStyle: {
              color: 'white',
              fontSize: 14,
            },
            headerBackImage: () => (
              <Icon name="chevron-left" size={38} color="white" />
            ),
            headerBackTitle: 'Back',
          }}
        />
      </RootStack.Navigator>
    </PlayerContextProvider>
  );
};
