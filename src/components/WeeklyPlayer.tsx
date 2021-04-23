import React, { Fragment } from 'react';

import { useFetch } from '../utils/useFetch';
import { Stat } from './Stat';
import { Loader } from './Loader';
import { LastUpdated } from './LastUpdated';
import { Countdown } from './Countdown';
import { Error } from './Error';
import { MODE_KEYS } from '../constants';
import { getColor, tailwind } from '../utils/tailwind';
import { Text, View } from 'react-native';
import { CachedData, WeeklyPlayerType } from '../types';
import LinearGradient from 'react-native-linear-gradient';

export const WeeklyPlayer: React.FC<{ id: string; platform: string }> = ({
  id,
  platform,
}) => {
  const { data, status, error } = useFetch<CachedData<WeeklyPlayerType> | null>(
    `/data/weekly/${encodeURIComponent(id)}/${platform}`,
    null,
  );

  if (status !== 'fetched') {
    return <Loader />;
  }

  if (error || !data) {
    return <Error message={error || 'No data'} />;
  }

  return (
    <View>
      <View style={tailwind('px-5')}>
        <View style={tailwind('flex-row justify-between mb-5 text-sm')}>
          <LastUpdated cacheTimestamp={data.cacheTimestamp} />
          <Countdown cacheTimestamp={data.cacheTimestamp} cacheMinutes={5} />
        </View>
      </View>
      {Object.keys(data.data.modes)
        .sort(
          (a, b) =>
            Object.keys(MODE_KEYS).indexOf(a) -
            Object.keys(MODE_KEYS).indexOf(b),
        )
        .map((key, ind) => (
          <Fragment key={key}>
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
                {MODE_KEYS[key as keyof typeof MODE_KEYS]}
              </Text>
            </LinearGradient>
            <View style={tailwind('px-5')}>
              <View style={tailwind('flex-row')}>
                <View style={tailwind('flex-1 mr-5')}>
                  <Stat
                    name="K/D"
                    value={data.data.modes[
                      key as keyof typeof MODE_KEYS
                    ].kdRatio.toString()}
                  />
                </View>
                <View style={tailwind('flex-1')}>
                  <Stat
                    name="Kills"
                    value={data.data.modes[
                      key as keyof typeof MODE_KEYS
                    ].kills.toString()}
                  />
                </View>
              </View>
            </View>
          </Fragment>
        ))}
    </View>
  );
};
