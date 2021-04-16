import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { tailwind } from '../utils/tailwind';
import { RootStackParamList } from '../App';
import { MainTitle } from '../components/MainTitle';
import { Loader } from '../components/Loader';
import { RouteProp } from '@react-navigation/native';
import { PlayerTrophies } from '../types';
import { getPlatformType } from '../utils/getPlatformType';
import { GlobalData } from '../components/GlobalData';

type PlayerScreenRouteProp = RouteProp<RootStackParamList, 'Player'>;

type PlayerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Player'
>;

type Props = {
  navigation: PlayerScreenNavigationProp;
  route: PlayerScreenRouteProp;
};

export const PlayerScreen: React.FC<Props> = ({ route }) => {
  const name = route.params.name;
  const [player, setPlayer] = useState<PlayerTrophies | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (name) {
      axios
        .get(`/trophies/${name}/2`)
        .then(res => {
          setPlayer(res.data);
        })
        .catch(() => {
          setError(true);
        });
    }
  }, [name]);

  if (error) {
    return (
      <View>
        <View style={tailwind('text-center')}>
          <Text style={tailwind('text-2xl font-bold text-orange-500')}>
            {name}
          </Text>
        </View>
        <View style={tailwind('text-center')}>
          <Text style={tailwind('text-xl text-white')}>Player is private</Text>
        </View>
      </View>
    );
  }

  if (!player) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={tailwind('h-full mt-10')}>
      <View style={tailwind('mb-10')}>
        <Text
          style={tailwind(
            'text-2xl font-bold text-white text-center font-rubik',
          )}
        >
          {name}
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
        {/* <WeeklyPlayer id={player.platformId} platform={player.platformType} /> */}
        <Text>WeeklyPlayer</Text>
      </View>
      <View style={tailwind('mb-20')}>
        <MainTitle title="Season 2" />
        <View style={tailwind('px-5 mt-5')}>
          <View style={tailwind('justify-between')}>
            {/* <Stat name="Trophies" value={player.trophyCount.toString()} /> */}
            {/* <Stat name="Kills" value={player.totalKills.toString()} /> */}
            <Text>Stats</Text>
          </View>
        </View>
      </View>
      <View style={tailwind('mb-20')}>
        <MainTitle title="Last 20 matches" />
        {/* <LatestMatches
          playerRouteName={name as string}
          platformId={player.platformId}
          platformType={player.platformType}
        /> */}
        <Text>Latest Matches</Text>
      </View>
    </SafeAreaView>
  );
};
