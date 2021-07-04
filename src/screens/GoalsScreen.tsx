import React, { useEffect } from 'react';
import { useContext } from 'react';
import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainTitle } from '../components/MainTitle';
import { Stat } from '../components/Stat';
import { Error } from '../components/Error';
import { AuthContext } from '../context/AuthContext';
import { LastUpdatedData, OverallGoal } from '../types';

import { tailwind } from '../utils/tailwind';
import { useFetch } from '../utils/useFetch';
import { Loader } from '../components/Loader';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

interface GoalRowProps {
  title: string;
  currentValue: number | string;
  requiredLabel: string;
  requiredValue: number | string;
  goalValue: string;
  isComplete: boolean;
}

export const GoalRow: React.FC<GoalRowProps> = ({
  title,
  currentValue,
  requiredLabel,
  requiredValue,
  goalValue,
  isComplete,
}) => {
  return (
    <View>
      <View style={tailwind('mt-10')}>
        <MainTitle title={title} />
      </View>
      <View style={tailwind('px-5')}>
        <View style={tailwind('flex-row mb-5')}>
          <View style={tailwind('flex-1 mr-5 justify-center')}>
            <Text style={tailwind('text-white font-rubik mb-2')}>
              Current {title}:{' '}
              <Text style={tailwind('font-bold')}>{currentValue}</Text>
            </Text>
            <Text style={tailwind('text-white font-rubik')}>
              {requiredLabel} required:{' '}
              <Text style={tailwind('font-bold')}>{requiredValue}</Text>
            </Text>
          </View>
          <View style={tailwind('flex-1')}>
            <Stat name="goal" value={goalValue} />
          </View>
        </View>
        {isComplete && (
          <View
            style={tailwind(
              'mt-5 bg-green-600 py-2 px-5 border-green-200 border',
            )}
          >
            <Text style={tailwind('text-white font-rubik-bold text-center')}>
              Complete
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export const GoalsScreen: React.FC<any> = ({ navigation }) => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const [refreshing, setRefreshing] = useState(false);
  const { status, data, error } = useFetch<LastUpdatedData<OverallGoal> | null>(
    '/overall-goal',
    null,
    false,
    refreshing,
    () => setRefreshing(false),
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRefreshing(true);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  if (error || (status === 'fetched' && !data)) {
    return (
      <View style={tailwind('flex justify-center mb-10')}>
        <Error message={error || 'No data'} />
      </View>
    );
  }

  if (status !== 'fetched') {
    return (
      <View style={tailwind('flex-1 justify-center')}>
        <Loader />
      </View>
    );
  }

  const goalData = data!.data;

  return (
    <ScrollView style={tailwind('mt-10')}>
      <View style={tailwind('pt-10 mb-10')}>
        <View style={tailwind('px-5')}>
          <Text style={tailwind('text-white font-rubik-bold text-xl')}>
            Welcome to your goals, {user?.firstName}
          </Text>
          <Text style={tailwind('mt-5 text-white')}>
            Below are all your goals and how they are tracking. Edit them at any
            time
          </Text>
          <View style={tailwind('mt-10')}>
            <Button
              title="Change goals"
              onPress={() => navigation.navigate('Modal')}
            />
          </View>
        </View>
        <GoalRow
          title="K/D Ratio"
          requiredLabel="Kills"
          requiredValue={goalData.kd.required}
          goalValue={goalData.kd.goal.toString()}
          currentValue={goalData.kd.current}
          isComplete={goalData.kd.isComplete}
        />
        <GoalRow
          title="Win Percent"
          requiredLabel="Wins"
          requiredValue={goalData.winPercent.required}
          goalValue={`${goalData.winPercent.goal}%`}
          currentValue={goalData.winPercent.current}
          isComplete={goalData.winPercent.isComplete}
        />
        <GoalRow
          title="Top 10 Percent"
          requiredLabel="Top 10s"
          requiredValue={goalData.topTenPercent.required}
          goalValue={`${goalData.topTenPercent.goal}%`}
          currentValue={goalData.topTenPercent.current}
          isComplete={goalData.topTenPercent.isComplete}
        />
      </View>
    </ScrollView>
  );
};
