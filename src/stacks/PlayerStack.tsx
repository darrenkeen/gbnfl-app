import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { PlayerStateContext } from '../context/PlayerContext';

import { MatchScreen } from '../screens/MatchScreen';
import { CachedData, Player } from '../types';
import { getColor } from '../utils/tailwind';
import { useFetch } from '../utils/useFetch';
import { Error } from '../components/Error';
import { PlayerTabParamList, PlayerTabScreen } from './PlayerTab';
import { Loader } from '../components/Loader';
import { HeaderRight } from '../components/HeaderRight';

export type PlayerStackParamList = {
  PlayerTabs: NavigatorScreenParams<PlayerTabParamList>;
  PlayerMatch: {
    matchId: string;
    uno: string;
  };
};

interface PlayerStackScreenProps {
  route: any;
}

export const PlayerStack = createStackNavigator<PlayerStackParamList>();

export const PlayerStackScreen: React.FC<PlayerStackScreenProps> = ({
  route,
}) => {
  const { player, setPlayer } = useContext(PlayerStateContext);
  const uno = route.params.uno;
  const { data, status, error } = useFetch<CachedData<Player> | null>(
    `/players/uno/${uno}`,
    null,
  );

  useEffect(() => {
    if (data && data.data) {
      setPlayer(data.data);
    }
  }, [data]);

  if (error) {
    return <Error message="Please try another player" />;
  }

  if (status !== 'fetched' || !data) {
    return <Loader />;
  }
  return (
    <PlayerStack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: getColor('background-1000') },
        headerStyle: {
          backgroundColor: getColor('background-1200'),
          shadowOpacity: 1,
          shadowColor: getColor('background-1200'),
          shadowRadius: 5,
        },
        headerBackTitleStyle: {
          color: getColor('white'),
          fontSize: 14,
        },
        headerTintColor: getColor('white'),
        headerRight: () => <HeaderRight />,
      }}
    >
      <PlayerStack.Screen
        name="PlayerTabs"
        component={PlayerTabScreen}
        options={{ title: `${player?.name}` }}
      />
      <PlayerStack.Screen
        name="PlayerMatch"
        component={MatchScreen}
        options={{ title: 'Match Stats' }}
      />
    </PlayerStack.Navigator>
  );
};
