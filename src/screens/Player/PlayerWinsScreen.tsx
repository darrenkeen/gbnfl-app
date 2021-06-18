import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MainTitle } from '../../components/MainTitle';
import { Error } from '../../components/Error';
import { PlayerStateContext } from '../../context/PlayerContext';

import { getColor, tailwind } from '../../utils/tailwind';
import { getPlatformType } from '../../utils/getPlatformType';
import { useFetch } from '../../utils/useFetch';
import { CachedData, LastUpdatedData, Trophy } from '../../types';
import { CURRENT_SEASON } from '../../constants';
import { Loader } from '../../components/Loader';
import LinearGradient from 'react-native-linear-gradient';
import { WinPlayerGroup } from '../../components/WinPlayerGroup';
import {
  getTeamKdRatio,
  getTeamValueBasedOnKey,
} from '../../utils/teamCalculations';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PlayerStackParamList } from '../../stacks/PlayerStack';
import { LastUpdated } from '../../components/LastUpdated';
import { Countdown } from '../../components/Countdown';

export type PlayerWinsScreenNavigationProp = StackNavigationProp<PlayerStackParamList>;

export const PlayerWinsScreen: React.FC = () => {
  const navigation = useNavigation<PlayerWinsScreenNavigationProp>();
  const { player } = useContext(PlayerStateContext);
  const { data, status, error } = useFetch<LastUpdatedData<Trophy[]> | null>(
    `/trophies/match/${player!.uno}/${CURRENT_SEASON}`,
    null,
    !player,
  );

  if (!player) {
    return <Error message="There is a problem, please try again" />;
  }

  if (status !== 'fetched') {
    return <Loader />;
  }

  if (error || !data) {
    return <Error message="Please try another player" />;
  }

  return (
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
      <MainTitle title="Season Wins" />
      <View style={tailwind('px-5')}>
        <View style={tailwind('flex-row justify-between mb-5 text-sm')}>
          <LastUpdated cacheTimestamp={data.lastUpdated} />
          <Countdown cacheTimestamp={data.lastUpdated} cacheMinutes={30} />
        </View>
      </View>
      <View style={tailwind('px-5')}>
        {data.data.length < 1 && (
          <View style={tailwind('my-5')}>
            <Text style={tailwind('text-lg text-center text-white')}>
              No wins this season so far...
            </Text>
          </View>
        )}
      </View>
      <View style={tailwind('mb-10')}>
        {data.data
          .sort((a, b) =>
            a.match.utcStartSeconds > b.match.utcStartSeconds ? -1 : 1,
          )
          .map(trophy => {
            const date = new Date(0);
            date.setUTCSeconds(trophy.match.utcStartSeconds);
            const trophyUnos = trophy.players!.map(player => player.uno);

            const winnersTeam = trophy.match.teams.find(team => {
              return team.players.find(player =>
                trophyUnos.includes(player.uno),
              );
            });
            if (!winnersTeam) {
              return null;
            }
            return (
              <View key={trophy.match.id}>
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
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('PlayerMatch', {
                      matchId: trophy.match.id,
                      uno: player.uno,
                    })
                  }
                >
                  <View style={tailwind('mt-5 px-4')}>
                    <WinPlayerGroup
                      mode={trophy.match.mode}
                      rank={winnersTeam.teamPlacement}
                      kills={getTeamValueBasedOnKey(
                        winnersTeam.players,
                        'kills',
                      )}
                      teamKdRatio={getTeamKdRatio(winnersTeam.players)}
                      players={winnersTeam.players}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};
