import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { IUser } from '@types';
import IconSpan from './IconSpan';
import styles from './UserAvatar.module.scss';

interface UserAvatarProps {
  user: IUser;
  isWhite?: boolean;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, isWhite }) => {
  const { id, name, avatarPath } = user;
  return (
    <Link href={`/c/${id}`}>
      <div
        className={cn(styles.avatar, {
          [styles.white]: isWhite,
        })}
      >
        <Image width={45} height={45} alt={name} src={avatarPath || ''} />
        <IconSpan Icon={FaCheckCircle} className={styles['verified-icon']} />
      </div>
    </Link>
  );
};

UserAvatar.defaultProps = {
  isWhite: false,
};

export default UserAvatar;
