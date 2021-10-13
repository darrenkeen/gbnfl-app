import React, { Fragment, useContext } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Text, View } from 'react-native';

import { useFetch } from '../utils/useFetch';
import { getColor, tailwind } from '../utils/tailwind';
import { LastUpdatedData, WeeklyPlayerType } from '../types';

import { Stat } from './Stat';
import { Loader } from './Loader';
import { LastUpdated } from './LastUpdated';
import { Countdown } from './Countdown';
import { Error } from './Error';
import { formatDate } from '../utils/formatDate';
import { numberWithCommas } from '../utils/numberWithCommas';
import { getGulagWinPercent } from '../utils/getGulagWinPercent';
import { AuthContext } from '../context/AuthContext';

interface WeeklyPlayerProps {
  uno: string;
}

export const WeeklyPlayer: React.FC<WeeklyPlayerProps> = ({ uno }) => {
  const {
    state: { gameModes },
  } = useContext(AuthContext);
  const {
    data,
    status,
    error,
  } = useFetch<LastUpdatedData<WeeklyPlayerType> | null>(
    `/weekly/${uno}`,
    null,
  );

  if (status !== 'fetched') {
    return <Loader />;
  }

  if (error || !data || data.data.modes.length < 1) {
    return <Error message={error || 'No data'} />;
  }

  return (
    <View>
      <View style={tailwind('px-5')}>
        <View style={tailwind('flex-row justify-between mb-5 text-sm')}>
          <LastUpdated cacheTimestamp={data.lastUpdated} />
          <Countdown cacheTimestamp={data.lastUpdated} cacheMinutes={30} />
        </View>
      </View>
      {data.data.modes
        .sort(
          (a, b) =>
            Object.keys(gameModes).indexOf(a.mode) -
            Object.keys(gameModes).indexOf(b.mode),
        )
        .map((mode, ind) => (
          <Fragment key={mode.mode}>
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
                {gameModes[mode.mode]?.name || mode.mode} - {mode.matchesPlayed}{' '}
                games
              </Text>
            </LinearGradient>
            <View style={tailwind('px-5')}>
              <View style={tailwind('flex-row mb-5')}>
                <View style={tailwind('flex-1 mr-5')}>
                  <Stat
                    name="K/D ratio"
                    value={Number(mode.kdRatio).toFixed(2)}
                  />
                </View>
                <View style={tailwind('flex-1')}>
                  <Stat
                    name="Kills per game"
                    value={Number(mode.killsPerGame).toFixed(2)}
                  />
                </View>
              </View>
              <View style={tailwind('flex-row mb-5')}>
                <View style={tailwind('flex-1 mr-5')}>
                  <Stat name="Kills" value={mode.kills.toString()} />
                </View>
                <View style={tailwind('flex-1')}>
                  <Stat name="Deaths" value={mode.deaths.toString()} />
                </View>
              </View>
              <View style={tailwind('flex-row mb-5')}>
                <View style={tailwind('flex-1 mr-5')}>
                  <Stat name="DMG" value={numberWithCommas(mode.damageDone)} />
                </View>
                <View style={tailwind('flex-1')}>
                  <Stat
                    name="DMG Taken"
                    value={numberWithCommas(mode.damageTaken)}
                  />
                </View>
              </View>
              <View style={tailwind('flex-row')}>
                <View style={tailwind('flex-1 mr-5')}>
                  <Stat
                    name="Gulag W%"
                    value={`${getGulagWinPercent(
                      mode.gulagKills,
                      mode.gulagDeaths,
                    ).toFixed(2)}%`}
                  />
                </View>
                <View style={tailwind('flex-1')}>
                  <Stat
                    name="AVG Life"
                    value={formatDate(Number(mode.avgLifeTime) * 1000)}
                  />
                </View>
              </View>
            </View>
          </Fragment>
        ))}
    </View>
  );
};
