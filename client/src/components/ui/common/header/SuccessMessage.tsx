import { FC } from 'react';
import styles from './SuccessMessage.module.scss';

const SuccessMessage: FC = () => (
  <div className={styles.background}>
    <div className={styles.successMessage}>Video successfully uploaded!</div>
  </div>
);

export default SuccessMessage;
