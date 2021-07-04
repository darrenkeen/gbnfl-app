import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';

import { tailwind } from '../utils/tailwind';
import { Error } from '../components/Error';
import { Loader } from '../components/Loader';
import { useFetch } from '../utils/useFetch';
import { LastUpdatedData, OverallGoal } from '../types';
import { EditGoalsOptions } from '../components/EditGoalsOptions';

export const EditGoalsModal: React.FC = () => {
  const { status, data, error } = useFetch<LastUpdatedData<OverallGoal> | null>(
    '/overall-goal',
    null,
    false,
  );

  if (error || (status === 'fetched' && !data)) {
    return (
      <View style={tailwind('flex justify-center mb-10')}>
        <Error message={error || 'No data'} />
      </View>
    );
  }

  if (status !== 'fetched') {
    return <Loader />;
  }

  const goalData = data!.data;

  return (
    <ScrollView>
      <EditGoalsOptions goalData={goalData} />
    </ScrollView>
  );
};
