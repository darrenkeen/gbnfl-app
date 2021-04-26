import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Picker from 'react-native-picker-select';

import { RouteProp } from '@react-navigation/native';

import { Loader } from '../components/Loader';
import { Error } from '../components/Error';
import { MainTitle } from '../components/MainTitle';

import { useFetch } from '../utils/useFetch';
import { getColor, tailwind } from '../utils/tailwind';
import { RootStackParamList } from '../App';
import { CachedData, WinMatchData, WinMatchPlayer } from '../types';
import { utcFormatDate } from '../utils/formatDate';
import { Stat } from '../components/Stat';
import {
  getTeamKdRatio,
  getTeamValueBasedOnKey,
} from '../utils/teamCalculations';
import { StatRow } from '../components/StatRow';

type WinScreenRouteProp = RouteProp<RootStackParamList, 'Win'>;

export type WinScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Win'
>;

type Props = {
  navigation: WinScreenNavigationProp;
  route: WinScreenRouteProp;
};

const compareOptions = [
  { label: 'Assists', value: 'assists' },
  { label: 'Deaths', value: 'deaths' },
  { label: 'Distance', value: 'distanceTraveled' },
  { label: 'DMG', value: 'damageDone' },
  { label: 'DMG Taken', value: 'damageTaken' },
  { label: 'Gulag Deaths', value: 'gulagDeaths' },
  { label: 'Gulag Kills', value: 'gulagKills' },
  { label: 'Headshots', value: 'headshots' },
  { label: 'KD Ratio', value: 'kdRatio' },
  { label: 'Kills', value: 'kills' },
  { label: 'Longest Streak', value: 'longestStreak' },
  { label: 'Score', value: 'score' },
  { label: 'SPM', value: 'scorePerMinute' },
  { label: 'Wall Bangs', value: 'wallBangs' },
];

const Chevron: React.FC = () => {
  return <Text style={tailwind('text-white')}>▼</Text>;
};

export const WinScreen: React.FC<Props> = ({ route }) => {
  const { matchDataId } = route.params;
  const { data, status, error } = useFetch<CachedData<WinMatchData> | null>(
    `/matches/id/${matchDataId}`,
    null,
  );
  const [compare, setCompare] = useState({
    label: 'Kills',
    value: 'kills',
  });
  if (status !== 'fetched') {
    return <Loader />;
  }

  if (error || !data) {
    return <Error message={error || 'Something went wrong'} />;
  }

  const winnersTeam = data.data.teams.find(team => team.teamPlacement === 1);

  if (!winnersTeam) {
    return <Error message={error || "Can't find players"} />;
  }

  return (
    <SafeAreaView style={tailwind('h-full')}>
      <ScrollView style={tailwind('pt-10')}>
        <View style={tailwind('mb-10')}>
          <Text
            style={tailwind('text-white font-rubik-bold text-center text-lg')}
          >
            {utcFormatDate(data.data.utcStartSeconds).toDateString()}
          </Text>
        </View>
        <View>
          <MainTitle title="Team stats" />
        </View>
        <View style={tailwind('flex-row px-4 mb-5')}>
          <View style={tailwind('flex-1 mr-5')}>
            <Stat
              name="Kills"
              value={getTeamValueBasedOnKey(
                winnersTeam.players,
                'kills',
              ).toString()}
            />
          </View>
          <View style={tailwind('flex-1')}>
            <Stat
              name="Deaths"
              value={getTeamValueBasedOnKey(
                winnersTeam.players,
                'deaths',
              ).toString()}
            />
          </View>
        </View>
        <View style={tailwind('flex-row px-4 mb-10')}>
          <View style={tailwind('flex-1 mr-5')}>
            <Stat
              name="KD Ratio"
              value={getTeamKdRatio(winnersTeam.players).toString()}
            />
          </View>
          <View style={tailwind('flex-1')}>
            <Stat
              name="DMG"
              value={getTeamValueBasedOnKey(
                winnersTeam.players,
                'damageDone',
              ).toString()}
            />
          </View>
        </View>
        <View>
          <MainTitle title="Player comparison" />
        </View>
        <View style={tailwind('px-4 mb-10')}>
          <Text style={tailwind('font-rubik text-white mb-4')}>
            Select a property to compare
          </Text>
          <Picker
            Icon={Chevron}
            style={{
              iconContainer: {
                right: 10,
                top: 12,
              },
              inputIOSContainer: {
                backgroundColor: getColor('background-400'),
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: getColor('background-600'),
              },
              inputIOS: {
                fontFamily: 'Rubik-Regular',
                fontSize: 20,
                color: getColor('white'),
              },
            }}
            value={compare.value}
            onValueChange={value => {
              const option = compareOptions.find(op => op.value === value);
              if (!option) {
                return;
              }
              setCompare({ label: option.label, value });
            }}
            items={compareOptions}
          />
        </View>
        <View>
          {winnersTeam.players.map(player => (
            <StatRow
              name={player.username}
              uno={player.uno}
              value={
                Number(player[compare.value as keyof WinMatchPlayer]) % 1 > 0
                  ? Number(player[compare.value as keyof WinMatchPlayer])
                      .toFixed(2)
                      .toString()
                  : Number(player[compare.value as keyof WinMatchPlayer])
              }
              label={compare.label}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
