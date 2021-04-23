import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {
  RouteProp,
  useNavigation,
  StackActions,
} from '@react-navigation/native';

import { Loader } from '../components/Loader';
import { Error } from '../components/Error';
import { MainTitle } from '../components/MainTitle';

import { useFetch } from '../utils/useFetch';
import { getColor, tailwind } from '../utils/tailwind';
import { Button } from '../components/Button';
import { RootStackParamList } from '../App';
import { CachedData, WinMatchData, WinMatchPlayer } from '../types';
import { WinPlayerGroup } from '../components/WinPlayerGroup';

type SeasonScreenRouteProp = RouteProp<RootStackParamList, 'Season'>;

export type SeasonScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Season'
>;

type Props = {
  navigation: SeasonScreenNavigationProp;
  route: SeasonScreenRouteProp;
};

const getTeamKills = (players: WinMatchPlayer[]) => {
  return players.reduce((acc, curr) => acc + curr.kills, 0);
};
const getTeamKdRatio = (players: WinMatchPlayer[]) => {
  const killsDeaths = players.reduce(
    (acc, curr) => {
      acc.kills += curr.kills;
      acc.deaths += curr.deaths;
      return acc;
    },
    { kills: 0, deaths: 0 },
  );
  return killsDeaths.kills / (killsDeaths.deaths || 1);
};

export const SeasonScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<SeasonScreenNavigationProp>();
  const { season } = route.params;
  const { data, status, error } = useFetch<CachedData<WinMatchData[]> | null>(
    `/matches/${season}`,
    null,
  );
  const {
    data: seasonData,
    status: seasonStatus,
    error: seasonError,
  } = useFetch<any>('/data/seasons', {});

  if (status !== 'fetched' || seasonStatus !== 'fetched') {
    return <Loader />;
  }

  if (error || seasonError || !data) {
    return <Error message={error || 'Something went wrong'} />;
  }

  return (
    <SafeAreaView style={tailwind('h-full')}>
      <ScrollView style={tailwind('pt-10')}>
        <View>
          <MainTitle title={`Season ${season}`} />
        </View>
        {data.data.length < 1 && (
          <View style={tailwind('my-5')}>
            <Text style={tailwind('text-lg text-center text-white')}>
              No wins so far...
            </Text>
          </View>
        )}
        {data.data
          .filter(dataGame => dataGame.trophies.length !== 0)
          .sort((a, b) => (a.utcStartSeconds > b.utcStartSeconds ? -1 : 1))
          .map(game => {
            const date = new Date(0);
            date.setUTCSeconds(game.utcStartSeconds);
            const trophyUnos = game.trophies.map(trophy => trophy.player.uno);
            const winnersTeamKey = Object.keys(game.teams).find(teamKey => {
              return game.teams[teamKey].players.find(player =>
                trophyUnos.includes(player.uno),
              );
            });
            if (!winnersTeamKey) {
              return null;
            }
            return (
              <View key={game.id}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={[
                    getColor('background-500'),
                    getColor('background-400'),
                  ]}
                  style={tailwind('px-5 py-4 mb-5')}
                >
                  <Text
                    style={tailwind(
                      'text-center text-white uppercase font-rubik-bold',
                    )}
                  >
                    {date.toDateString()}
                  </Text>
                </LinearGradient>
                <View style={tailwind('mt-5 px-4')}>
                  <WinPlayerGroup
                    mode={game.mode}
                    rank={game.teams[winnersTeamKey].teamPlacement}
                    kills={getTeamKills(game.teams[winnersTeamKey].players)}
                    teamKdRatio={getTeamKdRatio(
                      game.teams[winnersTeamKey].players,
                    )}
                    players={game.teams[winnersTeamKey].players}
                  />
                </View>
              </View>
            );
          })}
        <View style={tailwind('mt-10')}>
          <MainTitle title="Other seasons" />
          <View style={tailwind('flex-row px-5 mb-10')}>
            {Object.keys(seasonData.data)
              .filter(k => k !== season)
              .map((key, index) => {
                return (
                  <View key={key} style={tailwind(index === 0 ? 'mr-5' : '')}>
                    <View>
                      <Button
                        key={key}
                        type="full"
                        title={`Season ${key}`}
                        onPress={() => {
                          if (key !== season) {
                            navigation.dispatch(
                              StackActions.replace('Season', { season: key }),
                            );
                          }
                        }}
                        // disabled={key === season}
                      />
                    </View>
                  </View>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
