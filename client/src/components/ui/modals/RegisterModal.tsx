import { FC, useEffect } from 'react';
import useUser from '@hooks/useUser';
import AuthForm from '../common/AuthForm';
import Modal from './Modal';
import styles from './RegisterModal.module.scss';

interface RegisterModalProps {
  show: boolean;
  close: () => void;
}

const RegisterModal: FC<RegisterModalProps> = ({
  show,
  close,
}: RegisterModalProps) => {
  const user = useUser();
  useEffect(() => {
    if (user.id) {
      close();
    }
  }, [user.id, close]);
  return (
    <Modal className={styles.registerModal} show={show} close={close}>
      <div className={styles.wrapper}>
        <span className={styles.prompt}>
          Register for instant access to engagement
        </span>
        <AuthForm staticPosition />
      </div>
    </Modal>
  );
};

export default RegisterModal;
