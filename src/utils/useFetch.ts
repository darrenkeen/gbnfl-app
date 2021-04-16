import axios from 'axios';
import { useState, useEffect } from 'react';

export const useFetch = <T>(
  query: string,
  initial: T,
  pause: boolean = false,
  refreshing: boolean = false,
  onEndRefresh?: () => void,
  navigation?: any,
) => {
  const [status, setStatus] = useState<'fetching' | 'idle' | 'fetched'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T>(initial);

  useEffect(() => {
    setStatus('fetching');
    if (!pause) {
      axios
        .get(query)
        .then(res => {
          setData(res.data);
          setStatus('fetched');
          if (refreshing && onEndRefresh) {
            onEndRefresh();
          }
        })
        .catch(err => {
          console.error(err);
          setError(`There was a problem fetching ${query}`);
          setStatus('fetched');
          if (refreshing && onEndRefresh) {
            onEndRefresh();
          }
        });
    }
    if (navigation) {
      const unsubscribe = navigation.addListener('focus', () => {
        setStatus('fetching');
        if (!pause) {
          axios
            .get(query)
            .then(res => {
              setData(res.data);
              setStatus('fetched');
              if (refreshing && onEndRefresh) {
                onEndRefresh();
              }
            })
            .catch(err => {
              console.error(err);
              setError(`There was a problem fetching ${query}`);
              setStatus('fetched');
              if (refreshing && onEndRefresh) {
                onEndRefresh();
              }
            });
        }
        return unsubscribe;
      });
    }
  }, [pause, refreshing, navigation]);

  return { status, error, data };
};
