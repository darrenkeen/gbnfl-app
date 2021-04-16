import React from 'react';
import { Text } from 'react-native';

interface CountdownProps {
  cacheTimestamp: string;
  cacheMinutes: number;
}

export const Countdown: React.FC<CountdownProps> = ({
  cacheTimestamp,
  cacheMinutes,
}) => {
  const date = new Date(cacheTimestamp);
  const timePlusMinutes = date.setMinutes(date.getMinutes() + cacheMinutes);

  return <Text>{timePlusMinutes.toLocaleString()}</Text>;
};
