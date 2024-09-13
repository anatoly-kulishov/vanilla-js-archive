import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay: number = 1000) => {
  const [debounce, setDebounce] = useState<T>(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounce(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounce;
};
