import React, { Fragment } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Text, View } from 'react-native';

import { useFetch } from '../utils/useFetch';
import { MODE_KEYS } from '../constants';
import { getColor, tailwind } from '../utils/tailwind';
import { CachedData, WeeklyPlayerType } from '../types';

import { Stat } from './Stat';
import { Loader } from './Loader';
import { LastUpdated } from './LastUpdated';
import { Countdown } from './Countdown';
import { Error } from './Error';

interface WeeklyPlayerProps {
  uno: string;
}

export const WeeklyPlayer: React.FC<WeeklyPlayerProps> = ({ uno }) => {
  const { data, status, error } = useFetch<CachedData<WeeklyPlayerType> | null>(
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
          <LastUpdated cacheTimestamp={data.data.modes[0].updatedAt} />
          <Countdown
            cacheTimestamp={data.data.modes[0].updatedAt}
            cacheMinutes={30}
          />
        </View>
      </View>
      {data.data.modes
        .sort(
          (a, b) =>
            Object.keys(MODE_KEYS).indexOf(a.mode) -
            Object.keys(MODE_KEYS).indexOf(b.mode),
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
                {MODE_KEYS[mode.mode]}
              </Text>
            </LinearGradient>
            <View style={tailwind('px-5')}>
              <View style={tailwind('flex-row')}>
                <View style={tailwind('flex-1 mr-5')}>
                  <Stat
                    name="K/D"
                    value={Number(mode.kdRatio).toFixed(2).toString()}
                  />
                </View>
                <View style={tailwind('flex-1')}>
                  <Stat name="Kills" value={mode.kills.toString()} />
                </View>
              </View>
            </View>
          </Fragment>
        ))}
    </View>
  );
};
