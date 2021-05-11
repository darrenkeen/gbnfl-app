import React, { useContext } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { MainTitle } from '../../components/MainTitle';
import { WeeklyPlayer } from '../../components/WeeklyPlayer';
import { Error } from '../../components/Error';
import { PlayerStateContext } from '../../context/PlayerContext';

import { tailwind } from '../../utils/tailwind';
import { getPlatformType } from '../../utils/getPlatformType';

export const PlayerWeeklyScreen: React.FC = () => {
  const { player } = useContext(PlayerStateContext);

  if (!player) {
    return <Error message="There is a problem, please try again" />;
  }

  return (
    <ScrollView style={tailwind('pt-10')}>
      <View style={tailwind('mb-10')}>
        <Text
          style={tailwind(
            'text-2xl font-bold text-white text-center font-rubik',
          )}
        >
          {player.name}
        </Text>
        <Text style={tailwind('text-red-100 text-center font-rubik')}>
          {getPlatformType(player.platformType)}
        </Text>
      </View>
      <View style={tailwind('mb-10')}>
        <MainTitle title="Weekly" />
        <WeeklyPlayer id={player.platformId} platform={player.platformType} />
      </View>
    </ScrollView>
  );
};
