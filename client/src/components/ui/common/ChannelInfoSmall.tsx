import { FC } from 'react';
import { IUser, SCSSModule } from '@types';
import { cobbleStyles, formatNumber } from '@utils';
import defaultStyles from './ChannelInfoSmall.module.scss';
import UserAvatar from './UserAvatar';

interface ChannelInfoSmallProps {
  channel: IUser;
  message?: string;
  parentStyles?: SCSSModule;
}

const ChannelInfoSmall: FC<ChannelInfoSmallProps> = ({
  channel,
  message,
  parentStyles,
}) => {
  const styles = cobbleStyles(defaultStyles, parentStyles);
  const { username, subscribersCount } = channel;
  return (
    <div className={`${styles.channelInfoSmall}`}>
      <UserAvatar className={styles.userAvatar} user={channel} />
      <div className={styles.rightCol}>
        <div className={styles.name}>{username}</div>
        <div className={styles.subscribersCount}>
          {`${message || `${formatNumber(subscribersCount) || 0} subscribers`}`}
        </div>
      </div>
    </div>
  );
};

ChannelInfoSmall.defaultProps = {
  message: '',
  parentStyles: undefined,
};

export default ChannelInfoSmall;
