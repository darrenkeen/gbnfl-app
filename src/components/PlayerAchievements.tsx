import React from 'react';
import { Text, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { useFetch } from '../utils/useFetch';
import { PlayerAchievement } from '../types';

import { Loader } from './Loader';
import { Error } from './Error';
import { getAchievementString } from '../utils/getAchievementString';
import { tailwind } from '../utils/tailwind';
import { Stat } from './Stat';

interface PlayerAchievementsProps {
  uno: string;
}

export const PlayerAchievements: React.FC<PlayerAchievementsProps> = ({
  uno,
}) => {
  const { status, data, error } = useFetch<PlayerAchievement[] | null>(
    `/achievements/uno/${uno}`,
    null,
  );

  if (status !== 'fetched') {
    return <Loader />;
  }

  if (error || !data) {
    return <Error message={error || 'No data'} />;
  }

  const achievedCount = data.filter(achievement => achievement.achieved).length;

  return (
    <View style={tailwind('px-5')}>
      <View style={tailwind('mb-5')}>
        <Stat name="Achieved" value={`${achievedCount}/${data.length}`} />
      </View>
      <View>
        {data.map(achievement => (
          <View key={achievement.id}>
            <View style={tailwind('flex-row items-center')}>
              <Fontisto
                name={
                  achievement.achieved ? 'checkbox-active' : 'checkbox-passive'
                }
                style={tailwind(
                  `${
                    achievement.achieved ? 'text-green-500' : 'text-white'
                  } mr-2 text-lg`,
                )}
              />
              <Text
                style={tailwind(
                  `font-rubik text-lg ${
                    achievement.achieved ? 'text-green-500' : 'text-white'
                  }`,
                )}
              >
                {getAchievementString(achievement)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
