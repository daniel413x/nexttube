import { FC } from 'react';
import Image from 'next/image';
import NotFoundSvg from '@public/404.svg';
import styles from './index.module.scss';
import GenericLayout from '@components/layouts/GenericLayout';

const NotFoundScreen: FC = () => {
  return (
    <GenericLayout
      title="Not found"
      className={styles['not-found-screen']}
    >
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
}

export default NotFoundScreen;
