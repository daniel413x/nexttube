import { Dispatch, SetStateAction, useRef, useState } from 'react';
import useOnOutsideClick from './useOnOutsideClick';

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
  useOnOutsideClick(ref, handleClickOutside);
  return {
    ref,
    show,
    setShow,
  };
};

export default useOutside;
