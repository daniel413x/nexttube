import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { IUser } from '@types';
import defaultAvatar from '@public/images/default-avatar.png';
import IconSpan from './IconSpan';
import styles from './UserAvatar.module.scss';

interface UserAvatarProps {
  user: IUser;
  isWhite?: boolean;
  className?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, className, isWhite }) => {
  const { id, username, avatarPath } = user;
  return (
    <Link href={`/c/${id}`} title={username}>
      <div
        className={cn(styles.userAvatar, className, {
          [styles.white]: isWhite,
        })}
      >
        <Image
          className={styles.avatar}
          width={45}
          height={45}
          alt={username}
          src={avatarPath || defaultAvatar}
        />
        <IconSpan Icon={FaCheckCircle} className={styles.verifiedIcon} />
      </div>
    </Link>
  );
};

UserAvatar.defaultProps = {
  isWhite: false,
  className: '',
};

export default UserAvatar;
