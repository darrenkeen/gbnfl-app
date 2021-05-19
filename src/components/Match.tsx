import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/core';

import { formatDate } from '../utils/formatDate';
import { MODE_KEYS, WITH_RANK_MODE } from '../constants';
import { getColor, tailwind } from '../utils/tailwind';
import { PlayerLifetimeScreenNavigationProp } from '../screens/Player/PlayerLifetimeScreen';
import { numberWithCommas } from '../utils/numberWithCommas';

interface MatchProps {
  kills: number;
  startSeconds: number;
  damage: number;
  rank: number;
  kdRatio: number;
  gulagKills: number;
  gulagDeaths: number;
  matchId: string;
  mode: keyof typeof MODE_KEYS;
  uno: string;
}

const getGulagValue = (kill: number, death: number) => {
  if (kill > 0) {
    return 'win';
  } else if (death > 0) {
    return 'loss';
  }
  return 'n/a';
};

const MatchItem: React.FC<{ title?: string; value: number | string }> = ({
  title,
  value,
}) =>
  title === 'rank' ? (
    <View>
      <LinearGradient
        style={tailwind('items-center justify-center w-16 px-5 py-3')}
        colors={[
          getColor(value === '1' || value === 1 ? 'red-100' : 'background-200'),
          getColor(value === '1' || value === 1 ? 'red-200' : 'background-300'),
        ]}
      >
        <Text style={tailwind('font-bold text-white')}>{value}</Text>
      </LinearGradient>
    </View>
  ) : title === 'gulag' ? (
    <View style={tailwind('text-left')}>
      {value === 'win' ? (
        <Icon
          name="check-circle"
          style={tailwind('text-lg text-green-500 text-right')}
        />
      ) : value === 'loss' ? (
        <Icon
          name="times-circle"
          style={tailwind('text-lg text-red-500 text-right')}
        />
      ) : (
        <Icon5
          name="dot-circle"
          style={tailwind('text-lg text-gray-500 text-right')}
        />
      )}
      <Text style={tailwind('text-gray-400 uppercase')}>{title}</Text>
    </View>
  ) : (
    <View style={tailwind('text-left')}>
      <Text style={tailwind('text-lg font-bold text-white')}>{value} </Text>
      <Text style={tailwind('text-gray-400 uppercase')}>{title}</Text>
    </View>
  );

export const Match: React.FC<MatchProps> = ({
  kills,
  damage,
  startSeconds,
  rank,
  kdRatio,
  gulagKills,
  gulagDeaths,
  mode,
  matchId,
  uno,
}) => {
  const navigation = useNavigation<PlayerLifetimeScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PlayerMatch', { matchId, uno });
      }}
    >
      <LinearGradient
        colors={[getColor('background-300'), getColor('background-400')]}
        style={tailwind(
          'px-4 py-5 mb-5 border-t border-b border-white rounded-xl',
        )}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={tailwind('flex-row justify-between mb-5')}>
          <View style={tailwind('text-left')}>
            <Text style={tailwind('font-bold text-white')}>
              {MODE_KEYS[mode]}
            </Text>
            <Text style={tailwind('text-white')}>
              {formatDate(startSeconds)}
            </Text>
          </View>
          {WITH_RANK_MODE.includes(mode) && (
            <MatchItem title="rank" value={rank} />
          )}
        </View>
        <View style={tailwind('flex-row justify-between')}>
          <MatchItem title="Kills" value={kills} />
          <MatchItem title="K/D" value={kdRatio.toFixed(2)} />
          <MatchItem title="DMG" value={numberWithCommas(damage)} />
          <MatchItem
            title="gulag"
            value={getGulagValue(gulagKills, gulagDeaths)}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
