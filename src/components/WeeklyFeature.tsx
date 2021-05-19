import React from 'react';
import { Text, View } from 'react-native';
import { CachedData, WeeklyLeaderboard } from '../types';
import { tailwind } from '../utils/tailwind';
import { useFetch } from '../utils/useFetch';

// import { LoaderSvg } from '../components/LoaderSvg';
// import { Error } from '../components/Error';
import { Loader } from './Loader';
import { MainTitle } from './MainTitle';
import { StatRow } from './StatRow';

interface WeeklyFeatureProps {}

export const WeeklyFeature: React.FC<WeeklyFeatureProps> = ({}) => {
  const {
    status,
    data,
    error,
  } = useFetch<CachedData<WeeklyLeaderboard> | null>(
    '/weekly/leaderboard',
    null,
  );
  if (status !== 'fetched') {
    return <Loader />;
  }
  if (error) {
    return (
      <View style={tailwind('flex justify-center mb-10')}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!data || !data.data.kdRatioMax || !data.data.killsMax) {
    return null;
  }

  const weeklyLeaderboard = data.data;

  return (
    <View style={tailwind('mt-10 mb-10')}>
      <MainTitle title="Weekly Leaderboard" />
      <StatRow
        uno={weeklyLeaderboard.kdRatioMax.player.uno}
        label="KD Ratio"
        name={weeklyLeaderboard.kdRatioMax.player.name}
        value={weeklyLeaderboard.kdRatioMax.kdRatio}
      />
      <StatRow
        uno={weeklyLeaderboard.killsMax.player.uno}
        label="Kills"
        name={weeklyLeaderboard.killsMax.player.name}
        value={weeklyLeaderboard.killsMax.kills.toString()}
      />
    </View>
  );
};
