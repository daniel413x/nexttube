import { FC } from 'react';
import { IChannelProps } from '@types';
import SubscribeButton from '../common/SubscribeButton';
import ChannelInfoSmall from './ChannelInfoSmall';
import styles from './TopRow.module.scss';

const TopRow: FC<IChannelProps> = ({ user }) => (
  <div className={styles.topRow}>
    <ChannelInfoSmall channel={user} />
    <SubscribeButton idForSubscription={user.id} />
  </div>
);

export default TopRow;
