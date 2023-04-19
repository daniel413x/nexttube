import { FC } from 'react';
import GenericLayout from '@components/layouts/GenericLayout';
import ChannelInfoSmall from '@components/ui/channel/ChannelInfoSmall';
import Catalog from '@components/ui/home/Catalog';
import { IChannelProps } from '@types';
import styles from './index.module.scss';

const ChannelScreen: FC<IChannelProps> = ({ channel }) => {
  const { username, description, videos } = channel;
  return (
    <GenericLayout title={username} className={styles.channelScreen}>
      <div className="mb-10 w-1/3">
        <div className="flex items-center gap-12">
          <ChannelInfoSmall channel={channel} />
        </div>
        <article className="text-gray-500 mt-3">{description}</article>
      </div>
      <Catalog newVideos={videos || []} />
    </GenericLayout>
  );
};

export default ChannelScreen;
