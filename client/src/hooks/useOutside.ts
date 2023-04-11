import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface UseOutsideReturn {
  ref: any;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const useOutside = (initial: boolean): UseOutsideReturn => {
  const [show, setShow] = useState<boolean>(initial);
  const ref = useRef<HTMLElement>(null);
  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      setShow(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });
  return {
    ref,
    show,
    setShow,
  };
};

export default useOutside;
