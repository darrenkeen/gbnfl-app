import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { MODE_KEYS } from '../constants';
import { WinMatchPlayer } from '../types';
import { getColor, tailwind } from '../utils/tailwind';

interface PlayerGroupProps {
  mode: keyof typeof MODE_KEYS;
  rank: number;
  kills: number;
  teamKdRatio: number;
  players: WinMatchPlayer[];
}

const WinPlayerStatItem: React.FC<{ name: string; value: string | number }> = ({
  name,
  value,
}) => {
  return (
    <View style={tailwind('flex-row')}>
      <Text style={tailwind('font-rubik-bold text-sm text-white')}>
        {value}{' '}
      </Text>
      <Text
        style={tailwind('text-gray-500 font-rubik-light text-sm uppercase')}
      >
        {name}
      </Text>
    </View>
  );
};

const WinPlayerItem: React.FC<{ player: WinMatchPlayer; isLast: boolean }> = ({
  player,
  isLast,
}) => {
  return (
    <View
      style={[
        tailwind('py-3'),
        !isLast ? tailwind('border-b border-gray-500') : {},
      ]}
    >
      <Text style={tailwind('mb-2 text-white font-rubik-bold')}>
        {player.username}
      </Text>
      <View style={tailwind('flex-row justify-between text-white')}>
        <WinPlayerStatItem
          value={`${player.kills}/${player.deaths}`}
          name="K/D"
        />
        <WinPlayerStatItem
          value={Number(player.kdRatio).toFixed(2)}
          name="KD Ratio"
        />
        <WinPlayerStatItem value={player.damageDone} name="DMG" />
      </View>
    </View>
  );
};

const WinPlayerGroupItem: React.FC<{
  title?: string;
  value: number | string;
}> = ({ title, value }) =>
  title === 'rank' ? (
    <View>
      <LinearGradient
        style={tailwind('items-center justify-center w-16 px-5 py-3')}
        colors={[
          getColor(value === '1' || value === 1 ? 'red-100' : 'background-200'),
          getColor(value === '1' || value === 1 ? 'red-200' : 'background-300'),
        ]}
      >
        <Text style={tailwind('font-rubik-bold text-white')}>{value}</Text>
      </LinearGradient>
    </View>
  ) : (
    <View style={tailwind('text-left')}>
      <Text style={tailwind('text-lg font-rubik-bold text-white')}>
        {value}{' '}
      </Text>
      <Text
        style={tailwind('text-sm font-rubik-light text-gray-200 uppercase')}
      >
        {title}
      </Text>
    </View>
  );

export const WinPlayerGroup: React.FC<PlayerGroupProps> = ({
  mode,
  rank,
  kills,
  teamKdRatio,
  players,
}) => {
  return (
    <View style={tailwind('mb-5')}>
      <LinearGradient
        colors={[getColor('background-300'), getColor('background-400')]}
        style={tailwind('relative z-10 px-4 py-3 rounded-xl')}
      >
        <View style={tailwind('flex-row justify-between ')}>
          <WinPlayerGroupItem title="Kills" value={kills} />
          <WinPlayerGroupItem title="K/D" value={teamKdRatio?.toFixed(2)} />
          {MODE_KEYS[mode] !== MODE_KEYS.br_dmz_plnbld && (
            <WinPlayerGroupItem title="rank" value={rank} />
          )}
        </View>
      </LinearGradient>
      <LinearGradient
        colors={[getColor('background-300'), getColor('background-400')]}
        style={tailwind(
          'px-4 pt-12 pb-3 mb-5 -mt-10 border-t border-b border-background-500 rounded-xl',
        )}
      >
        {players.map((player, index) => (
          <WinPlayerItem
            key={player.uno}
            player={player}
            isLast={index === players.length - 1}
          />
        ))}
      </LinearGradient>
    </View>
  );
};
