import { FC } from 'react';
import { IUser } from '@types';
import { formatNumber } from '@utils';
import UserAvatar from '../common/UserAvatar';
import styles from './ChannelInfoSmall.module.scss';

interface ChannelInfoSmallProps {
  channel: IUser;
  message?: string;
}

const ChannelInfoSmall: FC<ChannelInfoSmallProps> = ({ channel, message }) => {
  const { username, subscribersCount } = channel;
  return (
    <div className={styles.channelInfoSmall}>
      <UserAvatar className={styles.userAvatar} user={channel} />
      <div className={styles.rightCol}>
        <div className={styles.name}>{username}</div>
        <div className={styles.subscribersCount}>
          {`${message || formatNumber(subscribersCount) || 0} subscribers`}
        </div>
      </div>
    </div>
  );
};

ChannelInfoSmall.defaultProps = {
  message: '',
};

export default ChannelInfoSmall;
