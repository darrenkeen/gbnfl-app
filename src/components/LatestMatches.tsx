import React from 'react';

import { CachedData, CodLatestData, LatestMatchesResponse } from '../types';
import { useFetch } from '../utils/useFetch';
import { Loader } from './Loader';
import { LastUpdated } from './LastUpdated';
import { Countdown } from './Countdown';
import { Match } from './Match';
import { Error } from './Error';
import { Text, View } from 'react-native';
import { getColor, tailwind } from '../utils/tailwind';
import LinearGradient from 'react-native-linear-gradient';

interface LatestMatchesProps {
  platformId: string;
  platformType: string;
  playerRouteName: string;
}

const getGrouped = (matches: CodLatestData['matches']) => {
  return matches.reduce((acc, curr) => {
    const date = new Date(curr.utcStartSeconds * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const key = `${day}/${month}/${year}`;
    const el = acc[key];

    if (el) {
      return { ...acc, [key]: [...el, curr] };
    } else {
      return { ...acc, [key]: [curr] };
    }
  }, {} as Record<string, CodLatestData['matches']>);
};

export const LatestMatches: React.FC<LatestMatchesProps> = ({
  platformId,
  platformType,
  playerRouteName,
}) => {
  const {
    status,
    data,
    error,
  } = useFetch<CachedData<LatestMatchesResponse> | null>(
    `/data/latest/${encodeURIComponent(platformId)}/${platformType}`,
    null,
  );

  if (error) {
    return (
      <View style={tailwind('flex justify-center mb-10')}>
        <Error message={error} />
      </View>
    );
  }

  if (status !== 'fetched' || !data) {
    return <Loader />;
  }

  return (
    <View>
      <View style={tailwind('px-5')}>
        <View style={tailwind('flex-row justify-between mb-5 text-sm')}>
          <LastUpdated cacheTimestamp={data.cacheTimestamp} />
          <Countdown cacheTimestamp={data.cacheTimestamp} cacheMinutes={5} />
        </View>
      </View>
      {Object.keys(getGrouped(data.data.matches)).map(dateKey => (
        <View key={dateKey} style={tailwind('w-full')}>
          <LinearGradient
            colors={[getColor('background-500'), getColor('background-400')]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={tailwind(
              'px-5 py-4 mb-5 border-t border-b border-background-500',
            )}
          >
            <Text style={tailwind('text-center text-white uppercase')}>
              {dateKey}
            </Text>
          </LinearGradient>
          <View style={tailwind('px-5')}>
            {getGrouped(data.data.matches)[dateKey].map(match => (
              <Match
                key={match.matchID}
                matchId={match.matchID}
                kills={match.playerStats.kills}
                damage={match.playerStats.damageDone}
                startSeconds={match.utcStartSeconds}
                rank={match.playerStats.teamPlacement}
                kdRatio={match.playerStats.kdRatio}
                mode={match.mode}
                playerRouteName={playerRouteName}
                inGameId={match.player.username}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};
