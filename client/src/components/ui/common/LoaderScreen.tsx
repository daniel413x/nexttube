import Image from 'next/image';
import { FC } from 'react';
import logo from '@public/logos/nexttube-logo.png';
import LoaderIcon from './LoaderBarIcon';
import styles from './LoaderScreen.module.scss';

const LoaderScreen: FC = () => (
  <div className={styles.loaderScreen}>
    <div className={styles.wrapper}>
      <Image priority width={311} height={58} src={logo} alt="NextTube logo" />
      <LoaderIcon />
    </div>
  </div>
);

export default LoaderScreen;
