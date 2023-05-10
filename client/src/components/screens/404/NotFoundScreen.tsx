import Image from 'next/image';
import { FC } from 'react';
import MainLayout from '@components/layouts/MainLayout';
import NotFoundSvg from '@public/images/404.svg';
import styles from './NotFoundScreen.module.scss';

const NotFoundScreen: FC = () => (
  <MainLayout title="Not found" className={styles.notFoundScreen}>
    <Image
      className={styles.graphic}
      alt="the page was not found"
      src={NotFoundSvg}
      layout="responsive"
      width={500}
      height={500}
    />
  </MainLayout>
);

export default NotFoundScreen;
