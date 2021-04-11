import axios from 'axios';
import { useState, useEffect } from 'react';

export const useFetch = <T>(
  query: string,
  initial: T,
  pause: boolean = false,
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
        })
        .catch(err => {
          console.error(err);
          setError(`There was a problem fetching ${query}`);
          setStatus('fetched');
        });
    }
  }, [pause]);

  return { status, error, data };
};
