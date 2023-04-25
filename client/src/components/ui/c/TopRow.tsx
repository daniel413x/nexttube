import { FC } from 'react';
import { IChannelProps } from '@types';
import ChannelInfoSmall from '../common/ChannelInfoSmall';
import SubscribeButton from '../common/SubscribeButton';
import styles from './TopRow.module.scss';

const TopRow: FC<IChannelProps> = ({ user }) => (
  <div className={styles.topRow}>
    <ChannelInfoSmall channel={user} />
    <SubscribeButton idForSubscription={user.id} />
  </div>
);

export default TopRow;
