import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import { Loader } from '../components/Loader';
import { MainTitle } from '../components/MainTitle';
import { StatRow } from '../components/StatRow';
import { CachedData, WeeklyLeaderboard } from '../types';
import { tailwind } from '../utils/tailwind';
import { useFetch } from '../utils/useFetch';

export const WeeklyLeaderboardScreen: React.FC = () => {
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
    <SafeAreaView style={tailwind('mb-10')}>
      <View style={tailwind('mt-10')}>
        <MainTitle title="Weekly Leaderboard" />
        <View>
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
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 200,
              height: 100,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 10,
              padding: 10,
              justifyContent: 'center',
              marginTop: 30,
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
              More leaderboards coming soon
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
