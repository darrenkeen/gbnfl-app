import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';

import { PlayerAddBox } from '../components/PlayerAddBox';
import { Player } from '../types';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { tailwind } from '../utils/tailwind';
import { Button } from '../components/Button';
import { getColor } from 'tailwind-rn';
import { StackNavigationProp } from '@react-navigation/stack';

type AddTrophyScreenNavigationProp = any;
interface AddTrophyScreenProps {
  navigation: AddTrophyScreenNavigationProp;
}

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

export const AddTrophyScreen: React.FC<AddTrophyScreenProps> = ({
  navigation,
}) => {
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
      navigation.goBack();
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
    <SafeAreaView style={tailwind('bg-background-1000 flex-1 mt-10')}>
      <ScrollView>
        <Text style={tailwind('text-white text-base px-5 mb-10 text-center')}>
          Type in the amount of kills for each player. This will automatically
          select the player but if you need to remove any, just select their
          name. Enter the date of win below
        </Text>
        <View>
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
};
