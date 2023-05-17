import { FC } from 'react';
import MainLayout from '@components/layouts/MainLayout';
import TopRow from '@components/ui/c/TopRow';
import Catalog from '@components/ui/common/Catalog';
import { IChannelProps } from '@types';
import styles from './ChannelScreen.module.scss';

const ChannelScreen: FC<IChannelProps> = ({ user }) => {
  const { username, description, videos } = user;
  return (
    <MainLayout title={username}>
      <div className={styles.channelScreen}>
        <TopRow user={user} />
        <article className={styles.description}>{description}</article>
      </div>
      <Catalog videos={videos || []} />
    </MainLayout>
  );
};

export default ChannelScreen;
