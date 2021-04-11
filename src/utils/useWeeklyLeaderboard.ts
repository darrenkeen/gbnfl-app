import { useState, useEffect } from 'react';
import { useFetch } from './useFetch';

interface WeeklyLeaderboard {
  killsLeader: null | {
    name: string;
    value: string;
  };
  kdRatioLeader: null | {
    name: string;
    value: string;
  };
}

export const useWeeklyLeaderboard = () => {
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState<WeeklyLeaderboard>(
    {
      killsLeader: null,
      kdRatioLeader: null,
    },
  );
  const { status, data, error } = useFetch<Record<string, any>>(
    '/data/weekly/all',
    {},
  );

  useEffect(() => {
    if (status === 'fetched' && !error) {
      const kdRatioLeader = Object.keys(data.data).reduce((acc: any, val) => {
        const next = data.data[val].all;
        if (!acc) {
          return { name: val, value: next.kdRatio };
        }
        const currentLeader = data.data[acc.name].all;
        if (currentLeader.kdRatio > next.kdRatio) {
          return acc;
        }
        if (currentLeader.kdRatio === next.kdRatio) {
          return currentLeader.kills > next.kills
            ? acc
            : currentLeader.kills === next.kills
            ? currentLeader.deaths <= next.kills
              ? acc
              : acc
            : { name: val, value: next.kdRatio };
        }
        return { name: val, value: next.kdRatio };
      }, null);
      const killsLeader = Object.keys(data.data).reduce((acc: any, val) => {
        const next = data.data[val].all;

        if (!acc) {
          return { name: val, value: next.kills };
        }

        const currentLeader = data.data[acc.name].all;
        if (currentLeader.kills > next.kills) {
          return acc;
        }
        if (currentLeader.kills === next.kills) {
          return currentLeader.deaths <= next.deaths
            ? acc
            : { name: val, value: next.kills };
        }
        return { name: val, value: next.kills };
      }, null);

      setWeeklyLeaderboard({ killsLeader, kdRatioLeader });
    }
  }, [status]);

  return { status, error, weeklyLeaderboard };
};
