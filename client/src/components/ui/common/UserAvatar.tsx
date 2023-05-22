import { CHANNEL_ACCESSOR } from '@data/consts';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { IUser, SCSSModule } from '@types';
import useFocused from '@hooks/useFocused';
import { cobbleStyles } from '@utils';
import defaultAvatar from '@public/images/default-avatar.png';
import IconSpan from './IconSpan';
import defaultStyles from './UserAvatar.module.scss';

interface UserAvatarProps {
  user: IUser;
  isWhite?: boolean;
  className?: string;
  parentStyles?: SCSSModule;
}

const UserAvatar: FC<UserAvatarProps> = ({
  user,
  className,
  isWhite,
  parentStyles,
}) => {
  const styles = cobbleStyles(defaultStyles, parentStyles);
  const { username, avatarPath } = user;
  const { ref, focused } = useFocused();
  return (
    <div
      className={cn(styles.userAvatar, className, {
        [styles.white]: isWhite,
        [styles.focused]: focused,
      })}
    >
      <Link
        className={styles.aOverlay}
        ref={ref}
        href={`/c/${user[CHANNEL_ACCESSOR]}`}
        title={username}
        tabIndex={-1}
      />
      <Image
        className={styles.avatar}
        width={45}
        height={45}
        alt={username}
        src={avatarPath || defaultAvatar}
      />
      <IconSpan Icon={FaCheckCircle} className={styles.verifiedIcon} />
    </div>
  );
};

UserAvatar.defaultProps = {
  isWhite: false,
  className: '',
  parentStyles: undefined,
};

export default UserAvatar;
