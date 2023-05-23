import { useEffect, useRef, useState } from 'react';
import useActiveElement from './useActiveElement';

const useFocused = (checkInside = false) => {
  const ref = useRef<any>(null);
  const [focused, setFocused] = useState<boolean>(false);
  const activeElement = useActiveElement();
  useEffect(() => {
    const isFocused = checkInside
      ? ref.current?.contains(activeElement)
      : activeElement === ref.current;
    setFocused(!!isFocused);
  }, [activeElement, checkInside]);

  return {
    ref,
    focused,
  };
};

export default useFocused;
