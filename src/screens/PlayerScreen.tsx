import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, View, Text, ScrollView, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LineChart } from 'react-native-chart-kit';

import { tailwind } from '../utils/tailwind';
import { RootStackParamList } from '../App';
import { MainTitle } from '../components/MainTitle';
import { Loader } from '../components/Loader';
import { RouteProp } from '@react-navigation/native';
import { PlayerTrophies } from '../types';
import { getPlatformType } from '../utils/getPlatformType';
import { GlobalData } from '../components/GlobalData';
import { WeeklyPlayer } from '../components/WeeklyPlayer';
import { LatestMatches } from '../components/LatestMatches';
import { Error } from '../components/Error';

type PlayerScreenRouteProp = RouteProp<RootStackParamList, 'Player'>;

export type PlayerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Player'
>;

type Props = {
  navigation: PlayerScreenNavigationProp;
  route: PlayerScreenRouteProp;
};

export const PlayerScreen: React.FC<Props> = ({ route }) => {
  const uno = route.params.uno;
  const [player, setPlayer] = useState<PlayerTrophies | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`/trophies/uno/${uno}/2`)
      .then(res => {
        setPlayer(res.data);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  if (error) {
    return <Error message="Please try another player" />;
  }

  if (!player) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={tailwind('h-full')}>
      <ScrollView style={tailwind('pt-10')}>
        <View style={tailwind('mb-10')}>
          <Text
            style={tailwind(
              'text-2xl font-bold text-white text-center font-rubik',
            )}
          >
            {player.name}
          </Text>
          <Text style={tailwind('text-red-100 text-center font-rubik')}>
            {getPlatformType(player.platformType)}
          </Text>
        </View>

        <View style={tailwind('mb-20')}>
          <MainTitle title="Global Stats" />
          <GlobalData
            platformId={player.platformId}
            platformType={player.platformType}
          />
        </View>
        <View style={tailwind('mb-20')}>
          <MainTitle title="Weekly" />
          <WeeklyPlayer id={player.platformId} platform={player.platformType} />
        </View>
        <View style={tailwind('mb-20')}>
          <MainTitle title="Season Stats" />
          <View style={tailwind('px-5 mt-5')}>
            <Text
              style={tailwind('text-center text-white font-rubik text-base')}
            >
              Coming soon
            </Text>
          </View>
        </View>
        <View style={tailwind('mb-20')}>
          <MainTitle title="Last 20 matches" />
          <LatestMatches
            platformId={player.platformId}
            platformType={player.platformType}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
