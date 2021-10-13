import React, { Fragment, useContext } from 'react';
import { Text, View } from 'react-native';

import { useFetch } from '../utils/useFetch';
import { CURRENT_SEASON } from '../constants';
import { getColor, tailwind } from '../utils/tailwind';
import { LastUpdatedData, SeasonStatsResponse } from '../types';

import { Stat } from './Stat';
import { Loader } from './Loader';
import { Error } from './Error';
import LinearGradient from 'react-native-linear-gradient';
import { getGulagWinPercent } from '../utils/getGulagWinPercent';
import { LastUpdated } from './LastUpdated';
import { Countdown } from './Countdown';
import { AuthContext } from '../context/AuthContext';

interface WeeklyPlayerProps {
  uno: string;
}

export const SeasonStats: React.FC<WeeklyPlayerProps> = ({ uno }) => {
  const {
    state: { gameModes },
  } = useContext(AuthContext);
  const {
    data,
    status,
    error,
  } = useFetch<LastUpdatedData<SeasonStatsResponse> | null>(
    `/season/${uno}/${CURRENT_SEASON}`,
    null,
  );

  if (status !== 'fetched') {
    return <Loader />;
  }

  if (error || !data) {
    return <Error message={error || 'No data'} />;
  }

  const seasonData = data.data;

  return (
    <View>
      <View style={tailwind('px-5')}>
        <View style={tailwind('flex-row justify-between mb-5 text-sm')}>
          <LastUpdated cacheTimestamp={data.lastUpdated} />
          <Countdown cacheTimestamp={data.lastUpdated} cacheMinutes={30} />
        </View>
      </View>
      {seasonData
        .sort(
          (a, b) =>
            Object.keys(gameModes).indexOf(a.mode) -
            Object.keys(gameModes).indexOf(b.mode),
        )
        .map((gameMode, ind) => (
          <Fragment key={gameMode.mode}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[getColor('background-500'), getColor('background-400')]}
              style={[
                tailwind(
                  'mb-5 px-5 py-4 border-t border-b border-background-500',
                ),
                ind !== 0 ? tailwind('mt-10') : {},
              ]}
            >
              <Text style={tailwind('text-center text-white uppercase')}>
                {gameModes[gameMode.mode]?.name || gameMode.mode} -{' '}
                {gameMode.gamesPlayed} games
              </Text>
            </LinearGradient>
            <View style={tailwind('px-5')}>
              <View style={tailwind('flex-row mb-5')}>
                <View style={tailwind('flex-1 mr-5')}>
                  <Stat name="Wins" value={gameMode.wins.toString()} />
                </View>
                <View style={tailwind('flex-1 ')}>
                  <Stat
                    name="K/D ratio"
                    value={Number(gameMode.kdRatio).toFixed(2)}
                  />
                </View>
              </View>
              <View style={tailwind('flex-row mb-5')}>
                <View style={tailwind('flex-1 mr-5')}>
                  <Stat name="Kills" value={gameMode.kills.toString()} />
                </View>
                <View style={tailwind('flex-1')}>
                  <Stat name="Deaths" value={gameMode.deaths.toString()} />
                </View>
              </View>
              <View style={tailwind('flex-row mb-5')}>
                <View style={tailwind('flex-1 mr-5')}>
                  <Stat
                    name="Gulag W%"
                    value={`${getGulagWinPercent(
                      gameMode.gulagWins,
                      gameMode.gulagLosses,
                    ).toFixed(2)}%`}
                  />
                </View>
                <View style={tailwind('flex-1')}>
                  <Stat name="Assists" value={gameMode.assists.toString()} />
                </View>
              </View>
            </View>
          </Fragment>
        ))}
    </View>
  );
};
