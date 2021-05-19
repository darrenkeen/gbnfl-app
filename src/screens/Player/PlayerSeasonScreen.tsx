import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { MainTitle } from '../../components/MainTitle';
import { Error } from '../../components/Error';
import { PlayerStateContext } from '../../context/PlayerContext';
import { getPlatformType } from '../../utils/getPlatformType';

import { tailwind } from '../../utils/tailwind';

export const PlayerSeasonScreen: React.FC = () => {
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
      <MainTitle title="Season Stats" />
      <View style={tailwind('px-5 mt-5')}>
        <Text style={tailwind('text-center text-white font-rubik text-base')}>
          Coming soon
        </Text>
      </View>
    </ScrollView>
  );
};
