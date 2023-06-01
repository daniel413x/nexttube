import { FC, useEffect } from 'react';
import videoApi from '@store/api/video';
import { toastSuccess } from '@utils';
import Button from '../common/Button';
import styles from './DeleteVideoModal.module.scss';
import Modal from './Modal';

interface DeleteVideoModalProps {
  show: string;
  close: () => void;
}

const DeleteVideoModal: FC<DeleteVideoModalProps> = ({
  show,
  close,
}: DeleteVideoModalProps) => {
  const [removeVideo, { isSuccess, isLoading }] =
    videoApi.useDeleteVideoMutation();
  const submit = () => removeVideo(show);
  useEffect(() => {
    if (isSuccess) {
      close();
      toastSuccess('Video deleted');
    }
  }, [isSuccess, close]);
  const bool = !!show;
  return (
    <Modal show={bool} close={close}>
      <div className={styles.deleteVideoModal}>
        <span className={styles.prompt}>
          Deleted videos cannot be recovered.
          <br />
          Delete this video?
        </span>
        <Button
          className={styles.confirmButton}
          onClick={submit}
          loading={isLoading}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteVideoModal;
