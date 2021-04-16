import React from 'react';
import { format } from 'date-fns';
import { tailwind } from '../utils/tailwind';
import { Text } from 'react-native';

interface LastUpdatedProps {
  cacheTimestamp: string;
}

export const LastUpdated: React.FC<LastUpdatedProps> = ({ cacheTimestamp }) => {
  const date = new Date(cacheTimestamp);
  const dateString = format(date, 'HH:mm dd/MM/yy');

  return (
    <Text style={tailwind('text-gray-400')}>Last updated {dateString}</Text>
  );
};
