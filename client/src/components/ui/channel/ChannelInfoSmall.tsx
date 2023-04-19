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
  const { username, subscribersCount, avatarPath } = channel;
  return (
    <div className={styles.channelInfoSmall}>
      {avatarPath && <UserAvatar user={channel} />}
      <div>
        <div className={styles.name}>{username}</div>
        <div className={styles.name}>
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
