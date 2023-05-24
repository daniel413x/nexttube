import { FC } from 'react';
import LoaderIcon from './LoaderIcon';
import styles from './LoaderScreen.module.scss';

const LoaderScreen: FC = () => (
  <div className={styles.loaderScreen}>
    <div className={styles.wrapper}>
      <LoaderIcon />
    </div>
  </div>
);

export default LoaderScreen;
