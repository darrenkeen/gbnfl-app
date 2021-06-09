import React from 'react';

import { useFetch } from '../utils/useFetch';
import { Countdown } from './Countdown';
import { LastUpdated } from './LastUpdated';
import { Error } from './Error';
import { Stat } from './Stat';
import { Loader } from './Loader';
import { View } from 'react-native';
import { tailwind } from '../utils/tailwind';
import { CachedData, LastUpdatedData, LifetimeData } from '../types';

interface GlobalDataProps {
  uno: string;
}

export const GlobalData: React.FC<GlobalDataProps> = ({ uno }) => {
  const {
    status,
    data,
    error,
  } = useFetch<LastUpdatedData<LifetimeData> | null>(`/lifetime/${uno}`, null);

  if (error || (status === 'fetched' && !data)) {
    return (
      <View style={tailwind('flex justify-center mb-10')}>
        <Error message={error || 'No data'} />
      </View>
    );
  }

  if (status !== 'fetched') {
    return <Loader />;
  }

  const lifetimeData = data!.data;

  return (
    <View style={tailwind('px-5')}>
      <View style={tailwind('flex-row justify-between mb-5 text-sm')}>
        <LastUpdated cacheTimestamp={data!.lastUpdated} />
        <Countdown cacheTimestamp={data!.lastUpdated} cacheMinutes={30} />
      </View>
      <View style={tailwind('flex-row mb-5')}>
        <View style={tailwind('flex-1 mr-5')}>
          <Stat name="Wins" value={lifetimeData.wins.toString()} />
        </View>
        <View style={tailwind('flex-1')}>
          <Stat
            name="K/D"
            value={Number(lifetimeData.kdRatio).toFixed(2).toString()}
          />
        </View>
      </View>
      <View style={tailwind('flex-row mb-5')}>
        <View style={tailwind('mr-5 flex-1')}>
          <Stat name="Kills" value={lifetimeData.kills.toString()} />
        </View>
        <View style={tailwind('flex-1')}>
          <Stat name="Deaths" value={lifetimeData.deaths.toString()} />
        </View>
      </View>
      <View style={tailwind('flex-row mb-5')}>
        <View style={tailwind('mr-5 flex-1')}>
          <Stat
            name="Win %"
            value={
              ((lifetimeData.wins / lifetimeData.gamesPlayed) * 100)
                .toFixed(2)
                .toString() + '%'
            }
          />
        </View>
        <View style={tailwind('flex-1')}>
          <Stat
            name="top 10 %"
            value={
              ((lifetimeData.topTen / lifetimeData.gamesPlayed) * 100)
                .toFixed(2)
                .toString() + '%'
            }
          />
        </View>
      </View>
      <View style={tailwind('flex-row mb-5')}>
        <View style={tailwind('flex-1 mr-5')}>
          <Stat name="Downs" value={lifetimeData.downs.toString()} />
        </View>
        <View style={tailwind('flex-1')}>
          <Stat name="Revives" value={lifetimeData.revives.toString()} />
        </View>
      </View>
    </View>
  );
};
