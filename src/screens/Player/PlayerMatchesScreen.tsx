import React, { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Error } from '../../components/Error';
import { LatestMatches } from '../../components/LatestMatches';
import { MainTitle } from '../../components/MainTitle';
import { PlayerStateContext } from '../../context/PlayerContext';
import { getPlatformType } from '../../utils/getPlatformType';

import { tailwind } from '../../utils/tailwind';

export const PlayerMatchesScreen: React.FC = () => {
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
        <MainTitle title="Matches" />
        <LatestMatches uno={player.uno} />
      </View>
    </ScrollView>
  );
};
