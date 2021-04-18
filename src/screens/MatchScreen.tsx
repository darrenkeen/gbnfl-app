import React from 'react';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { format, addMilliseconds } from 'date-fns';

import { tailwind } from '../utils/tailwind';
import { useFetch } from '../utils/useFetch';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';

import { CachedData, MatchData } from '../types';
import { RootStackParamList } from '../App';
import { MODE_KEYS } from '../constants';
import { MainTitle } from '../components/MainTitle';
import { Stat } from '../components/Stat';
import { PlayerGroup } from '../components/PlayerGroup';

type MatchScreenRouteProp = RouteProp<RootStackParamList, 'Match'>;

export type MatchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Match'
>;

type Props = {
  navigation: MatchScreenNavigationProp;
  route: MatchScreenRouteProp;
};

const matchStartDateFormat = (time: number) => {
  const date = new Date(time * 1000);
  const dateString = format(date, 'MM/dd/yy, HH:mm:ss');
  return `${dateString}`;
};
const matchDuration = (time: number) => {
  var helperDate = addMilliseconds(new Date(0), time);
  return format(helperDate, 'mm:ss');
};

export const MatchScreen: React.FC<Props> = ({ route }) => {
  const { matchId, username } = route.params;
  const { data, status, error } = useFetch<CachedData<MatchData> | null>(
    `/data/match/${matchId}`,
    null,
  );
  if (status !== 'fetched') {
    return <Loader />;
  }

  if (error || !data) {
    return <Error message={error || 'No data'} />;
  }

  const matchData = data.data;
  const teams = matchData.teams;
  const sortedTeamKeys = Object.entries(teams)
    .sort(([, a], [, b]) => a.teamPlacement - b.teamPlacement)
    .map(([k]) => k);
  const playerTeamKey = Object.keys(teams).find(key => {
    const playerIndex = teams[key].players.findIndex(player => {
      return player.player.username === username;
    });
    return playerIndex > -1;
  });

  if (!playerTeamKey) {
    return <Error message="Can't find player in match" />;
  }

  return (
    <SafeAreaView style={tailwind('h-full mt-10')}>
      <ScrollView>
        <View style={tailwind('mb-10')}>
          <Text
            style={tailwind('text-2xl font-rubik-bold text-white text-center')}
          >
            {MODE_KEYS[matchData.mode]}
          </Text>
          <Text
            style={tailwind(
              'text-sm font-rubik-light text-gray-400 text-center',
            )}
          >
            {matchStartDateFormat(matchData.utcStartSeconds)}
          </Text>
        </View>
        <View style={tailwind('px-5 mb-10')}>
          <View style={tailwind('flex-row')}>
            <View style={tailwind('flex-1 mr-5')}>
              <Stat name="Duration" value={matchDuration(matchData.duration)} />
            </View>
            <View style={tailwind('flex-1 mr-5')}>
              <Stat name="Players" value={matchData.playerCount.toString()} />
            </View>
          </View>
        </View>
        <View style={tailwind('px-5 mb-10 text-center')}>
          <Text
            style={tailwind(
              'text-sm font-rubik-light text-gray-400 text-center',
            )}
          >
            #{matchId}
          </Text>
        </View>
        <MainTitle title="Player Placement" />
        <View style={tailwind('px-5 mt-5 mb-10')}>
          <PlayerGroup
            mode={matchData.mode}
            rank={teams[playerTeamKey].teamPlacement}
            kills={teams[playerTeamKey].kills}
            teamKdRatio={teams[playerTeamKey].teamKdRatio}
            players={teams[playerTeamKey].players}
          />
        </View>
        <MainTitle title="Standings" />
        <View style={tailwind('px-5 mt-5')}>
          {sortedTeamKeys.map(key => (
            <PlayerGroup
              key={key}
              mode={matchData.mode}
              rank={teams[key].teamPlacement}
              kills={teams[key].kills}
              teamKdRatio={teams[key].teamKdRatio}
              players={teams[key].players}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
