import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Text, TouchableOpacity, View } from 'react-native';

import { useFetch } from '../utils/useFetch';
import { getColor, tailwind } from '../utils/tailwind';
import { generateTrophyEmoji } from '../utils/generateTrophyEmoji';

import { Button } from './Button';
import { PlayerTrophies } from '../types';
import { Loader } from './Loader';
// import { Error } from '../components/Error';

export const TrophyTable: React.FC = () => {
  const { status, data, error } = useFetch<PlayerTrophies[]>('/trophies/2', []);

  if (status !== 'fetched') {
    return <Loader />;
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[getColor('background-1000'), getColor('background-300')]}
      style={tailwind('rounded-b-3xl bg-background-300')}
    >
      <View style={tailwind('justify-center px-5 mb-10 mt-10')}>
        <View style={tailwind('w-full')}>
          <View
            style={tailwind(
              'overflow-hidden border-t border-red-100 rounded-tl-lg rounded-tr-lg bg-red-200 flex-row',
            )}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[getColor('red-200'), getColor('red-300')]}
              style={tailwind('px-4 py-3 bg-red-300 w-40')}
            >
              <Text style={tailwind('text-white text-lg font-rubik')}>
                Player
              </Text>
            </LinearGradient>
            <View style={tailwind('px-4 py-3')}>
              <Text style={tailwind('text-white text-lg font-rubik')}>
                Trophies
              </Text>
            </View>
          </View>
          <View>
            {data.map((item, index) => (
              <View key={item.name} style={tailwind('flex-row')}>
                <LinearGradient
                  colors={[
                    getColor(
                      index % 2 !== 0 ? 'background-100' : 'background-200',
                    ),
                    getColor(
                      index % 2 !== 0 ? 'background-800' : 'background-900',
                    ),
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[tailwind('px-3 py-3 w-40 justify-center')]}
                >
                  <TouchableOpacity
                    onPress={() => {
                      console.log('pressed');
                    }}
                  >
                    <Text style={tailwind('text-white font-rubik text-sm')}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
                <View
                  style={[
                    index % 2 !== 0
                      ? tailwind('bg-background-100')
                      : tailwind('bg-background-200'),
                    tailwind('flex-1 justify-center px-3 py-3'),
                  ]}
                >
                  <Text style={tailwind('text-lg')}>
                    {generateTrophyEmoji(item.trophyCount)}
                    <Text style={tailwind('opacity-40')}>
                      {generateTrophyEmoji(item.unapprovedCount)}
                    </Text>
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={tailwind('flex justify-center px-5')}>
        <Button title="Add trophy" onPress={() => console.log('dsad')} />
      </View>
    </LinearGradient>
  );
};
