import { Dialog, Transition } from '@headlessui/react';
import cn from 'classnames';
import React, { Fragment, RefObject, forwardRef, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Children } from '@types';
import Button from '../common/Button';
import IconSpan from '../common/IconSpan';
import styles from './Modal.module.scss';

interface ModalProps {
  show: any;
  close: () => void;
  children: Children;
  noCloseButton?: boolean;
  className?: string;
}

const Modal = forwardRef(
  (
    { show, children, close, noCloseButton, className }: ModalProps,
    passedInRef: any
  ) => {
    const defaultRef = useRef<HTMLDivElement>(null);
    return (
      <Transition show={show} as={Fragment}>
        <Dialog onClose={close} className={styles.modal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={styles.overlay} aria-hidden="true" />
          </Transition.Child>
          <div className={styles.wrapper}>
            <div>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="east-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  ref={passedInRef || defaultRef}
                  className={cn(styles.window, className)}
                >
                  {!noCloseButton && (
                    <Button
                      className={styles.closeButton}
                      color="purple"
                      onClick={close}
                    >
                      <IconSpan Icon={IoMdClose} />
                    </Button>
                  )}
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  }
);

Modal.defaultProps = {
  noCloseButton: false,
  className: '',
};

export default Modal as (
  props: ModalProps & { ref?: RefObject<any> }
) => JSX.Element;
