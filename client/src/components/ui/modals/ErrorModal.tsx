import { FC, useEffect, useState } from 'react';
import Button from '../common/Button';
import styles from './ErrorModal.module.scss';
import Modal from './Modal';

interface ErrorModalProps {
  show: string;
  close: () => void;
}

const ErrorModal: FC<ErrorModalProps> = ({ show, close }: ErrorModalProps) => {
  const [prompt, setPrompt] = useState<string>('');
  useEffect(() => {
    if (show) {
      setPrompt(show);
    }
  }, [show]);
  const bool = !!show;
  return (
    <Modal show={bool} close={close} noCloseButton>
      <span className={styles.errorModal}>{prompt}</span>
      <Button className={styles.closeButton} onClick={close}>
        OK!
      </Button>
    </Modal>
  );
};

export default ErrorModal;
