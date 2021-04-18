import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';
import { MainTitle } from '../components/MainTitle';

import { useFetch } from '../utils/useFetch';
import { getColor, tailwind } from '../utils/tailwind';

export default function Season() {
  const { data, status, error } = useFetch<any>('/games', {});

  if (status !== 'fetched') {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <SafeAreaView style={tailwind('h-full mt-10')}>
      <ScrollView>
        <View>
          <MainTitle title="Season 2" />
        </View>
        {data
          .filter((dataGame: any) => dataGame.trophies.length !== 0)
          .map((game: any) => (
            <View key={game.id}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[
                  getColor('background-500'),
                  getColor('background-400'),
                ]}
                style={tailwind('px-5 py-4 mb-5')}
              >
                <Text
                  style={tailwind(
                    'text-center text-white uppercase font-rubik-bold',
                  )}
                >
                  {new Date(game.dateTime).toDateString()}
                </Text>
                <View style={tailwind('mt-5')}>
                  {game.trophies.map((trophy: any) => (
                    <View style={tailwind('mb-4')} key={trophy.id}>
                      <Text
                        style={tailwind('font-rubik text-white text-center')}
                      >
                        {trophy.name}{' '}
                      </Text>
                      <Text
                        style={tailwind('font-rubik text-gray-300 text-center')}
                      >
                        {trophy.kills}
                      </Text>
                    </View>
                  ))}
                </View>
              </LinearGradient>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
