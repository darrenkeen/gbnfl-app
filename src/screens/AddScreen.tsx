import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';

import { PlayerAddBox } from '../components/PlayerAddBox';
import { Player } from '../types';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { tailwind } from '../utils/tailwind';
import { Button } from '../components/Button';
import { getColor } from 'tailwind-rn';

const formatDate = (date: string) => {
  // formats a JS date to 'yyyy-mm-dd'
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }

  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
};

export default function Add() {
  const [selectedPlayers, setSelectedPlayers] = useState<
    { kills: number; playerId: string }[]
  >([]);
  const [, setErrors] = useState<any>({});

  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    axios
      .get('/players')
      .then(res => setPlayers(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const submitForm = async () => {
    try {
      await axios.post('/trophies', {
        players: selectedPlayers,
        season: 2,
        dateTime: formatDate(selectedDate.toISOString()),
      });
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  const setPlayer = (playerId: string, kills: number) => {
    const playerExistsIndex = selectedPlayers.findIndex(
      player => player.playerId === playerId,
    );
    if (playerExistsIndex === -1) {
      setSelectedPlayers([...selectedPlayers, { playerId, kills }]);
    } else {
      const currentSelectedPlayers = [...selectedPlayers];
      currentSelectedPlayers[playerExistsIndex] = { playerId, kills };
      setSelectedPlayers([...currentSelectedPlayers]);
    }
  };

  const removePlayer = (playerId: string) => {
    const selectedPlayersWithout = selectedPlayers.filter(
      player => player.playerId !== playerId,
    );
    setSelectedPlayers([...selectedPlayersWithout]);
  };

  return (
    <SafeAreaView style={tailwind('bg-background-1000 flex-1')}>
      <ScrollView>
        <View style={tailwind('mt-10')}>
          {players.map(player => (
            <PlayerAddBox
              key={player.id}
              player={player}
              setPlayer={setPlayer}
              removePlayer={removePlayer}
              isSelected={
                selectedPlayers.findIndex(p => p.playerId === player.id) > -1
              }
            />
          ))}
        </View>
        <View style={tailwind('px-4 items-center')}>
          <Text style={tailwind('font-rubik text-white text-base font-bold')}>
            Select date
          </Text>
          <DatePicker
            minimumDate={new Date('2021-01-01')}
            maximumDate={new Date()}
            textColor={getColor('white')}
            mode="date"
            date={selectedDate}
            onDateChange={date => {
              setSelectedDate(date);
            }}
          />
        </View>
        <View style={tailwind('flex justify-center px-5 mt-10')}>
          <Button title="Add trophies" onPress={submitForm} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
