import React, { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Player } from '../types';
import { getColor, tailwind } from '../utils/tailwind';

interface InputGroupProps {
  player: Player;
  setPlayer: (playerId: string, kills: number) => void;
  removePlayer: (playerId: string) => void;
  isSelected: boolean;
}

export const PlayerAddBox: React.FC<InputGroupProps> = ({
  player,
  setPlayer,
  removePlayer,
  isSelected,
}) => {
  const [kills, setKills] = useState<null | number>(null);

  const onSelect = (updatedKills?: number) => {
    setPlayer(player.id, updatedKills || kills || 0);
  };

  return (
    <>
      <LinearGradient
        colors={[getColor('background-500'), getColor('background-400')]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          tailwind('w-full px-5 py-2 mb-5 flex-row justify-between'),
          isSelected ? tailwind('border-2 border-red-200') : {},
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            isSelected ? removePlayer(player.id) : onSelect();
          }}
        >
          <View>
            <Text style={tailwind('text-lg text-white font-rubik')}>
              {player.name}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={tailwind('flex-row items-center')}>
          <TextInput
            style={tailwind(
              'w-12 p-1 text-center text-white bg-white bg-opacity-40 font-rubik',
            )}
            value={kills ? kills.toString() : ''}
            keyboardType="numeric"
            onChangeText={text => {
              console.log(text);
              const number = text.replace(/[^0-9]/g, '');
              console.log(number);
              setKills(Number(number));
              onSelect(Number(number));
            }}
          />
          <Text
            style={tailwind(
              'font-thin text-base text-gray-400 uppercase font-rubik',
            )}
          >
            {' '}
            Kills
          </Text>
        </View>
      </LinearGradient>
    </>
  );
};
