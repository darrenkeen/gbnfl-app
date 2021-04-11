import React from 'react';
import { Text, View } from 'react-native';
import { tailwind } from '../utils/tailwind';

// import { LoaderSvg } from '../components/LoaderSvg';
// import { Error } from '../components/Error';
import { useWeeklyLeaderboard } from '../utils/useWeeklyLeaderboard';
import { Loader } from './Loader';
import { MainTitle } from './MainTitle';
import { StatRow } from './StatRow';

interface WeeklyFeatureProps {}

export const WeeklyFeature: React.FC<WeeklyFeatureProps> = ({}) => {
  const { weeklyLeaderboard, status, error } = useWeeklyLeaderboard();
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

  if (!weeklyLeaderboard.kdRatioLeader || !weeklyLeaderboard.killsLeader) {
    return null;
  }

  return (
    <View style={tailwind('mt-10 mb-10')}>
      <MainTitle title="Weekly Leaderboard" />
      <StatRow
        label="KD Ratio"
        name={weeklyLeaderboard.kdRatioLeader.name}
        value={weeklyLeaderboard.kdRatioLeader.value}
      />
      <StatRow
        label="Kills"
        name={weeklyLeaderboard.killsLeader.name}
        value={weeklyLeaderboard.killsLeader.value}
      />
      <StatRow label="Gulag Wins" name="TBC" value="0" />
      <StatRow label="DMG" name="TBC" value="0" />
    </View>
  );
};
