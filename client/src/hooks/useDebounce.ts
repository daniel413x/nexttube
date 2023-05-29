import { useEffect, useState } from 'react';

const useDebounce = <T>(
  value: T,
  delay: number,
  callback?: (debouncedValue: T) => void
): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      if (callback) {
        callback(debouncedValue);
      }
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay, callback]);
  return debouncedValue;
};

export default useDebounce;
