import { Transition } from '@headlessui/react';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { Children } from '@types';
import styles from './Popup.module.scss';

interface PopupProps {
  boolean: boolean;
  children?: Children;
  className?: string;
}

const Popup = ({ children, boolean, className }: PopupProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [showTimeout, setShowTimeout] = useState<NodeJS.Timeout | undefined>();
  useEffect(() => {
    const createPopup = () => {
      setShow(true);
      if (showTimeout) {
        clearTimeout(showTimeout);
      }
      const timeout = setTimeout(() => {
        setShow(false);
      }, 1500);
      setShowTimeout(timeout);
    };
    if (boolean) {
      createPopup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boolean]);
  return (
    <Transition
      show={show}
      enter="ease-out duration-300"
      enterFrom="opacity-0 -translate-y-2"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 translate-y-2"
    >
      <div className={cn(styles.popup, className)}>{children}</div>
    </Transition>
  );
};

Popup.defaultProps = {
  className: '',
  children: undefined,
};

export default Popup;
