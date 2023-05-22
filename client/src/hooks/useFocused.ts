import { useEffect, useRef, useState } from 'react';
import useActiveElement from './useActiveElement';

const useFocused = () => {
  const ref = useRef(null);
  const [focused, setFocused] = useState<boolean>(false);
  const activeElement = useActiveElement();
  useEffect(() => {
    if (activeElement === ref.current) {
      setFocused(true);
    }
    if (focused && activeElement !== ref.current) {
      setFocused(false);
    }
  }, [activeElement, focused]);
  return {
    ref,
    focused,
  };
};

export default useFocused;
