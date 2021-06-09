import React, { useEffect, useState } from 'react';

import {
  CachedData,
  LastUpdatedData,
  MatchData,
  MatchListResponse,
} from '../types';
import { useFetch } from '../utils/useFetch';
import { Loader } from './Loader';
import { Match } from './Match';
import { Error } from './Error';
import { Text, View } from 'react-native';
import { getColor, tailwind } from '../utils/tailwind';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from './Button';
import { LastUpdated } from './LastUpdated';
import { Countdown } from './Countdown';

interface LatestMatchesProps {
  uno: string;
}

const getGrouped = (matches: MatchData[]) => {
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
  }, {} as Record<string, MatchData[]>);
};

export const LatestMatches: React.FC<LatestMatchesProps> = ({ uno }) => {
  const [count, setCount] = useState<number | null>(null);
  const [startSeconds, setStartSeconds] = useState<number>(0);
  const [matches, setMatches] = useState<MatchData[]>([]);

  const {
    status,
    data,
    error,
  } = useFetch<LastUpdatedData<MatchListResponse> | null>(
    `/matches/uno/${uno}/start/${startSeconds}`,
    null,
    false,
  );

  useEffect(() => {
    if (data && data.data.matches.length > 0) {
      if (matches.length > 0) {
        const newMatches = data.data.matches.filter(
          match => !matches.some(m => m.id === match.id),
        );
        setMatches([...matches, ...newMatches]);
      } else {
        setMatches([...matches, ...data.data.matches]);
      }

      // Need to filter out duplicates - by ID or startseconds since already ordered maybe?
      if (!count) {
        setCount(data?.data.totalMatches);
      }
    }
  }, [data]);

  if (error) {
    return (
      <View style={tailwind('flex justify-center mb-10')}>
        <Error message={error} />
      </View>
    );
  }

  if (status !== 'fetched' && matches.length < 0) {
    return <Loader />;
  }

  const groupedMatches = getGrouped(matches);

  const onViewMore = () => {
    const lastMatch = matches[matches.length - 1];
    setStartSeconds(lastMatch.utcStartSeconds);
  };

  return (
    <View>
      {data && (
        <View style={tailwind('px-5')}>
          <View style={tailwind('flex-row justify-between mb-5 text-sm')}>
            <LastUpdated cacheTimestamp={data.lastUpdated} />
            <Countdown cacheTimestamp={data.lastUpdated} cacheMinutes={30} />
          </View>
        </View>
      )}
      {Object.keys(groupedMatches).map(dateKey => (
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
            {groupedMatches[dateKey].map(match => (
              <Match
                key={match.inGameMatchId}
                matchId={match.id}
                kills={match.teams[0].players[0].kills}
                damage={match.teams[0].players[0].damageDone}
                startSeconds={match.utcStartSeconds}
                gulagKills={match.teams[0].players[0].gulagKills}
                gulagDeaths={match.teams[0].players[0].gulagDeaths}
                rank={match.teams[0].teamPlacement}
                kdRatio={Number(match.teams[0].players[0].kdRatio)}
                mode={match.mode}
                uno={match.teams[0].players[0].uno}
              />
            ))}
          </View>
        </View>
      ))}
      {count && matches.length < count && (
        <View style={tailwind('px-4')}>
          <Button
            title={`View more (${count - matches.length})`}
            onPress={onViewMore}
            loading={status === 'fetching'}
          />
        </View>
      )}
    </View>
  );
};
