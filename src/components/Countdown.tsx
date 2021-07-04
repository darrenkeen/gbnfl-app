import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { tailwind } from '../utils/tailwind';
import differenceInSeconds from 'date-fns/differenceInSeconds';

interface CountdownProps {
  cacheTimestamp: string;
  cacheMinutes: number;
}

export const Countdown: React.FC<CountdownProps> = ({
  cacheTimestamp,
  cacheMinutes,
}) => {
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    const date = new Date(cacheTimestamp);
    const timePlusMinutes = date.setMinutes(date.getMinutes() + cacheMinutes);
    const difference = differenceInSeconds(timePlusMinutes, new Date());
    setCounter(difference);
  }, []);

  useEffect(() => {
    let timer: any = null;
    if (counter > 0) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  const minutes = Math.floor(counter / 60);
  const seconds = counter - minutes * 60;

  return (
    <Text style={tailwind('text-gray-400')}>
      {counter < 0 ? (
        <>Refresh 00:00</>
      ) : (
        <>
          Refresh {minutes < 10 && '0'}
          {minutes}:{seconds < 10 && '0'}
          {seconds}
        </>
      )}
    </Text>
  );
};
