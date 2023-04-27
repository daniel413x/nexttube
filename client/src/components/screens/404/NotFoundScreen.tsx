import Image from 'next/image';
import { FC } from 'react';
import GenericLayout from '@components/layouts/GenericLayout';
import NotFoundSvg from '@public/images/404.svg';
import styles from './NotFoundScreen.module.scss';

const NotFoundScreen: FC = () => (
  <GenericLayout title="Not found" className={styles.notFoundScreen}>
    <Image
      className={styles.graphic}
      alt="the page was not found"
      src={NotFoundSvg}
      layout="responsive"
      width={500}
      height={500}
    />
  </GenericLayout>
);

export default NotFoundScreen;
