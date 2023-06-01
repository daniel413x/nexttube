import cn from 'classnames';
import { FC } from 'react';
import { IoMdCheckmarkCircle, IoMdCloudUpload } from 'react-icons/io';
import Button from '../../Button';
import IconSpan from '../../IconSpan';
import styles from './FooterForm.module.scss';

interface FooterFormProps {
  percent: number;
  isLoading: boolean;
  isUploaded: boolean;
  isSuccess: boolean;
  reset: () => void;
  handleCloseModal: () => void;
}

const FooterForm: FC<FooterFormProps> = ({
  percent,
  isUploaded,
  isLoading,
  isSuccess,
  reset,
  handleCloseModal,
}) => (
  <div className={styles.footerForm}>
    <div
      className={cn(styles.status, {
        [styles.uploaded]: isUploaded,
      })}
    >
      <IconSpan className={styles.uploadIcon} Icon={IoMdCloudUpload} />
      <IconSpan className={styles.checkmarkIcon} Icon={IoMdCheckmarkCircle} />
      <span className={styles.text}>
        {isUploaded ? 'Video chosen' : `Uploading ${percent}%...`}
      </span>
    </div>
    <Button
      color="purple"
      type="submit"
      className={styles.submitButton}
      loading={isLoading}
      onClick={() => {
        if (isSuccess) {
          reset();
          handleCloseModal();
        }
      }}
    >
      {isSuccess ? 'Done' : 'Submit'}
    </Button>
  </div>
);

export default FooterForm;
