import cn from 'classnames';
import { FC, useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Button from '@components/ui/common/Button';
import Input from '@components/ui/common/Input';
import SectionHeader from '@components/ui/common/SectionHeader';
import Modal from '@components/ui/modals/Modal';
import useActions from '@hooks/useActions';
import useUser from '@hooks/useUser';
import userApi from '@store/api/user';
import styles from './DeleteForm.module.scss';

const DeleteForm: FC = () => {
  const { logout, setUserDeletion } = useActions();
  const user = useUser();
  const [unblocker] = useState<string>(uuid().slice(0, 6));
  const [input, setInput] = useState<string>('');
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [deleteUser, { isLoading, isSuccess }] =
    userApi.useDeleteUserMutation();
  const onSubmit = () => {
    setUserDeletion(true);
    deleteUser(user.id);
  };
  const backHome = useCallback(() => {
    logout();
    setUserDeletion(false);
  }, [logout, setUserDeletion]);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  useEffect(() => {
    if (isSuccess) {
      setConfirmModal(false);
      setSuccessModal(true);
    }
  }, [isSuccess, setUserDeletion, successModal]);
  return (
    <div className={cn(styles.deleteForm, styles.userPage)}>
      <SectionHeader title="Delete your account" />
      <Modal
        className={styles.modal}
        show={successModal}
        close={() => backHome()}
      >
        <span className={styles.successMessage}>
          You successfully deleted your account
        </span>
        <Button
          className={styles.submitButton}
          disabled={unblocker !== input || isLoading}
          onClick={() => backHome()}
        >
          OK
        </Button>
      </Modal>
      <Modal
        className={styles.modal}
        show={confirmModal}
        close={() => setConfirmModal(false)}
      >
        <div>
          <div className={styles.info}>
            <span>Once an account is deleted, it cannot be recovered.</span>
            <span>
              Please confirm that you wish to delete your account by typing into
              the input the following text:
            </span>
            <span className={styles.unblockLine}>{unblocker}</span>
          </div>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <Button
            className={styles.submitButton}
            disabled={unblocker !== input || isLoading}
            onClick={() => onSubmit()}
          >
            Confirm
          </Button>
        </div>
      </Modal>
      <Button
        className={styles.showModalButton}
        onClick={() => setConfirmModal(true)}
        color="primaryBlank"
      >
        I want to delete my account
      </Button>
    </div>
  );
};

export default DeleteForm;
