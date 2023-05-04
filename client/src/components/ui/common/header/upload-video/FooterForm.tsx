import cn from 'classnames';
import { FC } from 'react';
import { IoMdCheckmarkCircle, IoMdCloudUpload } from 'react-icons/io';
import Button from '../../Button';
import IconSpan from '../../IconSpan';
import styles from './FooterForm.module.scss';

interface FooterFormProps {
  percent: number;
  isUploaded: boolean;
  isSuccess: boolean;
  reset: () => void;
  handleCloseModal: () => void;
}

const FooterForm: FC<FooterFormProps> = ({
  percent,
  isUploaded,
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
      <span>{isUploaded ? 'Video chosen' : `Uploading ${percent}%...`}</span>
    </div>
    <Button
      className={styles.submitButton}
      type={!isSuccess ? 'submit' : 'button'}
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
