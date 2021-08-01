import React from 'react';
import { Text, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { useFetch } from '../utils/useFetch';
import { AchievementType, PlayerAchievementWithMeta } from '../types';

import { Loader } from './Loader';
import { Error } from './Error';
import {
  getAchievementString,
  getTitleString,
} from '../utils/getAchievementString';
import { tailwind } from '../utils/tailwind';
import { Stat } from './Stat';
import { GradientTitle } from './GradientTitle';

interface PlayerAchievementsProps {
  uno: string;
}

export const PlayerAchievements: React.FC<PlayerAchievementsProps> = ({
  uno,
}) => {
  const { status, data, error } = useFetch<PlayerAchievementWithMeta | null>(
    `/achievements/uno/${uno}`,
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
      <View style={tailwind('mb-5 px-5 flex-row')}>
        <View style={tailwind('flex-1 mr-5')}>
          <Stat
            name="Achieved"
            value={`${data._meta.achieved}/${data._meta.total}`}
          />
        </View>
        <View style={tailwind('flex-1')}>
          <Stat name="Complete" value={`${data._meta.percentage}%`} />
        </View>
      </View>
      <View>
        {Object.keys(data.achievements)
          .filter(key => data.achievements[key as AchievementType].length > 0)
          .map(achievementKey => (
            <View key={achievementKey} style={tailwind('my-5')}>
              <GradientTitle
                title={getTitleString(achievementKey as AchievementType)}
              />
              <View style={tailwind('px-5')}>
                {data.achievements[achievementKey as AchievementType].map(
                  ach => (
                    <View key={ach.id}>
                      <View style={tailwind('flex-row items-center')}>
                        <Fontisto
                          name={
                            ach.achieved
                              ? 'checkbox-active'
                              : 'checkbox-passive'
                          }
                          style={tailwind(
                            `${
                              ach.achieved ? 'text-green-500' : 'text-white'
                            } mr-2 text-lg`,
                          )}
                        />
                        <Text
                          style={tailwind(
                            `font-rubik text-lg ${
                              ach.achieved ? 'text-green-500' : 'text-white'
                            }`,
                          )}
                        >
                          {getAchievementString(ach)}
                        </Text>
                      </View>
                    </View>
                  ),
                )}
              </View>
            </View>
          ))}
      </View>
    </View>
  );
};
