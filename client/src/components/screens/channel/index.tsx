import { FC } from 'react';
import GenericLayout from '@components/layouts/GenericLayout';
import TopRow from '@components/ui/channel/TopRow';
import Catalog from '@components/ui/home/Catalog';
import { IChannelProps } from '@types';
import styles from './index.module.scss';

const ChannelScreen: FC<IChannelProps> = ({ user }) => {
  const { username, description, videos } = user;
  return (
    <GenericLayout title={username} className={styles.channelScreen}>
      <div className="mb-10 w-1/3">
        <TopRow user={user} />
        <article className={styles.description}>{description}</article>
      </div>
      <Catalog newVideos={videos || []} itemsUlClassName={styles.itemsUl} />
    </GenericLayout>
  );
};

export default ChannelScreen;
