import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { AuthContext } from '../context/AuthContext';
import { WinMatchPlayer } from '../types';
import { numberWithCommas } from '../utils/numberWithCommas';
import { getColor, tailwind } from '../utils/tailwind';

interface PlayerGroupProps {
  mode: string;
  rank: number;
  kills: number;
  teamKdRatio: number;
  players: WinMatchPlayer[];
}

const PlayerStatItem: React.FC<{ name: string; value: string | number }> = ({
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

const PlayerItem: React.FC<{ player: WinMatchPlayer; isLast: boolean }> = ({
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
        {player.clanTag && (
          <Text style={tailwind('text-white font-rubik-bold')}>
            [{player.clanTag.replace('^3', '').replace('^7', '')}]&nbsp;
          </Text>
        )}
        {player.username}
      </Text>
      <View style={tailwind('flex-row justify-between text-white')}>
        <PlayerStatItem value={`${player.kills}/${player.deaths}`} name="K/D" />
        <PlayerStatItem
          value={Number(player.kdRatio).toFixed(2)}
          name="KD Ratio"
        />
        <PlayerStatItem
          value={numberWithCommas(player.damageDone)}
          name="DMG"
        />
      </View>
    </View>
  );
};

const PlayerGroupItem: React.FC<{ title?: string; value: number | string }> = ({
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

export const PlayerGroup: React.FC<PlayerGroupProps> = ({
  mode,
  rank,
  kills,
  teamKdRatio,
  players,
}) => {
  const {
    state: { gameModes },
  } = useContext(AuthContext);
  return (
    <View style={tailwind('mb-5')}>
      <LinearGradient
        colors={[getColor('background-300'), getColor('background-400')]}
        style={tailwind('relative z-10 px-4 py-3 rounded-xl')}
      >
        <View style={tailwind('flex-row justify-between ')}>
          <PlayerGroupItem title="Kills" value={kills} />
          <PlayerGroupItem title="K/D" value={teamKdRatio?.toFixed(2)} />
          {gameModes[mode]?.isRanked && (
            <PlayerGroupItem title="rank" value={rank} />
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
          <PlayerItem
            key={player.username}
            player={player}
            isLast={index === players.length - 1}
          />
        ))}
      </LinearGradient>
    </View>
  );
};
