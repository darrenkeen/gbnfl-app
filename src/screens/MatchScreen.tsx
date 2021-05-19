import React from 'react';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { format, addMilliseconds } from 'date-fns';

import { tailwind } from '../utils/tailwind';
import { useFetch } from '../utils/useFetch';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';

import { CachedData, MatchData } from '../types';
import { MODE_KEYS } from '../constants';
import { MainTitle } from '../components/MainTitle';
import { Stat } from '../components/Stat';
import { PlayerGroup } from '../components/PlayerGroup';
import { Button } from '../components/Button';
import {
  getTeamKdRatio,
  getTeamValueBasedOnKey,
} from '../utils/teamCalculations';
import { useState } from 'react';
import { PlayerStack, PlayerStackScreen } from '../stacks/PlayerStack';

type MatchScreenRouteProp = any;

export type MatchScreenNavigationProp = any;

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
  const navigation = useNavigation();
  const { matchId, uno } = route.params;
  const [showTeamCount, setShowTeamCount] = useState(5);
  const { data, status, error } = useFetch<CachedData<MatchData> | null>(
    `/matches/id/${matchId}`,
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
  const sortedTeamsByPlacement = teams.sort(
    (teamA, teamB) => teamA.teamPlacement - teamB.teamPlacement,
  );

  const playerTeam = teams.find(team => {
    return team.players.some(player => player.uno === uno);
  });

  const onShowMoreTeams = () => {
    setShowTeamCount(showTeamCount + 5);
  };

  if (!playerTeam) {
    return <Error message="Can't find player in match" />;
  }

  return (
    <SafeAreaView style={tailwind('h-full')}>
      <ScrollView style={tailwind('pt-10')}>
        <View style={tailwind('mb-10')}>
          <View style={tailwind('px-5')}>
            <Button
              type="outline"
              onPress={() => {
                navigation.goBack();
              }}
              title="Go back"
            />
          </View>
          <View style={tailwind('mb-10')}>
            <Text
              style={tailwind(
                'text-2xl font-rubik-bold text-white text-center',
              )}
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
                <Stat
                  name="Duration"
                  value={matchDuration(
                    matchData.utcEndSeconds * 1000 -
                      matchData.utcStartSeconds * 1000,
                  )}
                />
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
              #{matchData.inGameMatchId}
            </Text>
          </View>
          <MainTitle title="Player Placement" />
          <View style={tailwind('px-5 mt-5 mb-10')}>
            <PlayerGroup
              mode={matchData.mode}
              rank={playerTeam.teamPlacement}
              kills={getTeamValueBasedOnKey(playerTeam.players, 'kills')}
              teamKdRatio={getTeamKdRatio(playerTeam.players)}
              players={playerTeam.players}
            />
          </View>
          <MainTitle title="Standings" />
          <View style={tailwind('px-5 mt-5')}>
            {sortedTeamsByPlacement.slice(0, showTeamCount).map(team => (
              <PlayerGroup
                key={team.id}
                mode={matchData.mode}
                rank={team.teamPlacement}
                kills={getTeamValueBasedOnKey(team.players, 'kills')}
                teamKdRatio={getTeamKdRatio(team.players)}
                players={team.players}
              />
            ))}
            {teams.length > showTeamCount && (
              <View style={tailwind('px-4')}>
                <Button
                  title={`Show more (${teams.length - showTeamCount})`}
                  onPress={onShowMoreTeams}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
