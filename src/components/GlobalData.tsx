import React from 'react';

import { useFetch } from '../utils/useFetch';
import { Countdown } from './Countdown';
import { LastUpdated } from './LastUpdated';
import { Error } from './Error';
import { Stat } from './Stat';
import { Loader } from './Loader';
import { View } from 'react-native';
import { tailwind } from '../utils/tailwind';
import { CachedData } from '../types';

interface GlobalDataProps {
  platformId: string;
  platformType: string;
}

export const GlobalData: React.FC<GlobalDataProps> = ({
  platformId,
  platformType,
}) => {
  const { status, data, error } = useFetch<CachedData<any> | null>(
    `/data/lifetime/${encodeURIComponent(platformId)}/${platformType}`,
    null,
  );

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

  return (
    <View style={tailwind('px-5')}>
      <View style={tailwind('flex-row justify-between mb-5 text-sm')}>
        <LastUpdated cacheTimestamp={data!.cacheTimestamp} />
        <Countdown cacheTimestamp={data!.cacheTimestamp} cacheMinutes={5} />
      </View>
      <View style={tailwind('flex-row')}>
        <View style={tailwind('mr-5 flex-1')}>
          <Stat
            name="K/D"
            value={data!.data.lifetime.mode.br.properties.kdRatio
              .toFixed(2)
              .toString()}
          />
        </View>
        <View style={tailwind('flex-1')}>
          <Stat
            name="Wins"
            value={data!.data.lifetime.mode.br.properties.wins.toString()}
          />
        </View>
      </View>
    </View>
  );
};
