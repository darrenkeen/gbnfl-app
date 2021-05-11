import React, { useContext, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';

import { PlayerStateContext } from '../../context/PlayerContext';
import { tailwind } from '../../utils/tailwind';
import { MainTitle } from '../../components/MainTitle';
import { Loader } from '../../components/Loader';
import { CachedData, Player } from '../../types';
import { getPlatformType } from '../../utils/getPlatformType';
import { GlobalData } from '../../components/GlobalData';
import { Error } from '../../components/Error';
import { useFetch } from '../../utils/useFetch';
import { PlayerStackParamList } from '../../App';

type PlayerLifetimeScreenRouteProp = any;

export type PlayerLifetimeScreenNavigationProp = NativeStackNavigationProp<PlayerStackParamList>;

type Props = {
  navigation: PlayerLifetimeScreenNavigationProp;
  route: PlayerLifetimeScreenRouteProp;
};

export const PlayerLifetimeScreen: React.FC<Props> = ({ route }) => {
  const { player, setPlayer } = useContext(PlayerStateContext);
  const uno = route.params.uno;
  const { data, status, error } = useFetch<CachedData<Player> | null>(
    `/players/uno/${uno}`,
    null,
  );

  useEffect(() => {
    if (data && data.data) {
      setPlayer(data.data);
    }
  }, [data]);

  if (error) {
    return <Error message="Please try another player" />;
  }

  if (status !== 'fetched' || !player) {
    return <Loader />;
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
        <GlobalData
          platformId={player.platformId}
          platformType={player.platformType}
        />
      </View>
    </ScrollView>
  );
};
