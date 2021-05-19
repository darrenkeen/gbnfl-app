import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { PlayerStateContext } from '../../context/PlayerContext';
import { tailwind } from '../../utils/tailwind';
import { MainTitle } from '../../components/MainTitle';
import { getPlatformType } from '../../utils/getPlatformType';
import { GlobalData } from '../../components/GlobalData';
import { StackNavigationProp } from '@react-navigation/stack';
import { PlayerStackParamList } from '../../stacks/PlayerStack';

type PlayerLifetimeScreenRouteProp = any;

export type PlayerLifetimeScreenNavigationProp = StackNavigationProp<PlayerStackParamList>;

type PlayerLifetimeScreenProps = {
  route: PlayerLifetimeScreenRouteProp;
};

export const PlayerLifetimeScreen: React.FC<PlayerLifetimeScreenProps> = () => {
  const { player } = useContext(PlayerStateContext);

  if (!player) {
    return null;
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
      <View style={tailwind('mb-20')}>
        <MainTitle title="Global Stats" />
        <GlobalData uno={player.uno} />
      </View>
    </ScrollView>
  );
};
