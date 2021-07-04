import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';

import { getColor, tailwind } from '../utils/tailwind';
import { OverallGoal } from '../types';
import { GradientTitle } from './GradientTitle';
import { Button } from './Button';
import axios from 'axios';

interface EditGoalsOptionsProps {
  goalData: OverallGoal;
}

const getKdFromCurrent = (kd: OverallGoal['kd']): [number, number, number] => {
  const { goal } = kd;
  if (goal.toString().length === 1) {
    return [Number(goal), 0, 0];
  }
  const str = kd.goal.toString();
  const splitStr = str.replace('.', '').split('');
  return [Number(splitStr[0]), Number(splitStr[1]), Number(splitStr[2])];
};

const getStringKd = (kd: [number, number, number]) => {
  return `${kd[0]}.${kd[1]}${kd[2]}`;
};

export const EditGoalsOptions: React.FC<EditGoalsOptionsProps> = ({
  goalData,
}) => {
  const [isDirty, setIsDirty] = useState(false);
  const [kd, setKd] = useState<[number, number, number]>(
    getKdFromCurrent(goalData.kd),
  );
  const [topTenPercent, setTopTenPercent] = useState<number>(
    Number(goalData.topTenPercent.goal),
  );
  const [winPercent, setWinPercent] = useState<number>(
    Number(goalData.winPercent.goal),
  );
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if (!isDirty) {
        return;
      }

      e.preventDefault();

      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure to discard them and leave the screen?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Discard',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => navigation.dispatch(e.data.action),
          },
        ],
      );
    });

    return unsubscribe;
  }, [navigation, isDirty]);

  const onReset = (item: 'kd' | 'winPercent' | 'topTenPercent' | 'all') => {
    if (item === 'kd') {
      setKd(getKdFromCurrent(goalData.kd));
      return;
    }
    if (item === 'topTenPercent') {
      setTopTenPercent(Number(goalData.topTenPercent.goal));
      return;
    }
    if (item === 'winPercent') {
      setWinPercent(Number(goalData.winPercent.goal));
      return;
    }
    setKd(getKdFromCurrent(goalData.kd));
    setTopTenPercent(Number(goalData.topTenPercent.goal));
    setWinPercent(Number(goalData.winPercent.goal));
    setIsDirty(false);
  };

  const onSave = async () => {
    axios
      .post('/overall-goal', {
        kd: getStringKd(kd),
        winPercent,
        topTenPercent,
      })
      .then(() => console.log('success'))
      .catch(e => console.error(e));
  };

  return (
    <View style={tailwind('mt-10 mb-10')}>
      <View>
        <GradientTitle title="K/D Ratio" />
        <View style={tailwind('px-5 mb-5 items-end')}>
          <TouchableOpacity
            onPress={() => onReset('kd')}
            style={tailwind(
              'text-white border border-white px-1 py-1 w-20 rounded ',
            )}
          >
            <Text style={tailwind('text-white text-center text-xs')}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tailwind('flex-row px-5 mb-10')}>
          {kd.map((kdValue, ind) => {
            return (
              <React.Fragment key={ind}>
                <View
                  style={{
                    flex: 1,
                    height: 40,
                    maxWidth: '100%',
                    marginRight: ind !== kd.length - 1 ? 10 : 0,
                  }}
                >
                  <TextInput
                    underlineColorAndroid="transparent"
                    value={kdValue.toString()}
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      color: 'white',
                      borderWidth: 1,
                      borderColor: getColor('background-900'),
                      height: '100%',
                    }}
                    onKeyPress={event => {
                      const currKd: [number, number, number] = [...kd];
                      currKd[ind] = Number(event.nativeEvent.key) || 0;
                      setKd(() => [...currKd]);
                      setIsDirty(true);
                    }}
                    maxLength={1}
                    selectionColor="white"
                    keyboardType="numeric"
                  />
                </View>
                {ind === 0 && (
                  <View
                    style={{
                      flex: 1,
                      height: 40,
                      maxWidth: 20,
                      marginRight: 10,
                    }}
                  >
                    <TextInput
                      underlineColorAndroid="transparent"
                      editable={false}
                      value="."
                      style={{
                        textAlign: 'center',
                        fontSize: 20,
                        color: 'white',
                        borderWidth: 1,
                        borderColor: 'transparent',
                        height: '100%',
                      }}
                      selectionColor="white"
                      keyboardType="numeric"
                    />
                  </View>
                )}
              </React.Fragment>
            );
          })}
        </View>
        <Text style={tailwind('text-white font-rubik text-center')}>
          Current: {goalData.kd.current}
        </Text>
      </View>
      <View style={tailwind('mt-5')}>
        <GradientTitle title="Win Percent" />
        <View style={tailwind('px-5 mb-5 items-end')}>
          <TouchableOpacity
            onPress={() => onReset('winPercent')}
            style={tailwind(
              'text-white border border-white px-1 py-1 w-20 rounded ',
            )}
          >
            <Text style={tailwind('text-white text-center text-xs')}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tailwind('px-5 mb-5')}>
          <View
            style={tailwind(
              'w-full  border border-background-900 px-5 py-3 mb-5',
            )}
          >
            <Text
              style={tailwind('text-white font-rubik-bold text-lg text-center')}
            >
              {winPercent}%
            </Text>
          </View>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            step={1}
            maximumValue={100}
            minimumTrackTintColor={getColor('red-500')}
            maximumTrackTintColor={getColor('background-100')}
            value={winPercent}
            onValueChange={val => {
              setIsDirty(true);
              setWinPercent(val);
            }}
          />
        </View>
        <Text style={tailwind('text-white font-rubik text-center')}>
          Current: {goalData.winPercent.current}
        </Text>
      </View>
      <View style={tailwind('mt-5')}>
        <GradientTitle title="Top 10 percent" />
        <View style={tailwind('px-5 mb-5 items-end')}>
          <TouchableOpacity
            onPress={() => onReset('topTenPercent')}
            style={tailwind(
              'text-white border border-white px-1 py-1 w-20 rounded ',
            )}
          >
            <Text style={tailwind('text-white text-center text-xs')}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tailwind('px-5 mb-5')}>
          <View
            style={tailwind(
              'w-full  border border-background-900 px-5 py-3 mb-5',
            )}
          >
            <Text
              style={tailwind('text-white font-rubik-bold text-lg text-center')}
            >
              {topTenPercent}%
            </Text>
          </View>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            step={1}
            maximumValue={100}
            minimumTrackTintColor={getColor('red-500')}
            maximumTrackTintColor={getColor('background-100')}
            value={topTenPercent}
            onValueChange={val => {
              setTopTenPercent(val);
              setIsDirty(true);
            }}
          />
        </View>
        <Text style={tailwind('text-white font-rubik text-center')}>
          Current: {goalData.topTenPercent.current}
        </Text>
      </View>
      <View style={tailwind('mt-10 px-5')}>
        <Button title="Save" onPress={onSave} />
      </View>
      <View style={tailwind('px-5')}>
        <Button
          type="outline"
          title="Reset all"
          onPress={() => onReset('all')}
        />
      </View>
    </View>
  );
};
