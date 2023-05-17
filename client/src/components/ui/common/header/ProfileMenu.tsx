import {
  CHANNEL_ACCESSOR,
  CHANNEL_ROUTE,
  STUDIO_ROUTE,
  USER_ROUTE,
} from '@data/consts';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import useActions from '@hooks/useActions';
import useHideOnOutsideClick from '@hooks/useHideOnOutsideClick';
import useUser from '@hooks/useUser';
import defaultAvatar from '@public/images/default-avatar.png';
import IconSpan from '../IconSpan';
import styles from './ProfileMenu.module.scss';

const ProfileMenu: FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const user = useUser();
  const { logout } = useActions();
  const {
    show: showPopup,
    setShow: setShowPopup,
    ref,
  } = useHideOnOutsideClick(false);
  useEffect(() => setShow(true), [setShow]);
  return (
    <div
      className={cn(styles.profileMenu, {
        [styles.show]: show,
      })}
      ref={ref}
    >
      <button
        onClick={() => setShowPopup(!showPopup)}
        type="button"
        title="Menu toggle"
      >
        <Image
          src={user!.avatarPath || defaultAvatar}
          alt={user!.username || 'Avatar'}
          width={40}
          height={40}
          priority
        />
        <span className={styles.name}>{user?.username || 'User'}</span>
        <IconSpan Icon={showPopup ? HiChevronUp : HiChevronDown} />
      </button>
      {showPopup && (
        <ul className={styles.itemsUl}>
          <li key="my-channel">
            <Link href={`/${CHANNEL_ROUTE}/${user![CHANNEL_ACCESSOR]}`}>
              My channel
            </Link>
          </li>
          <li key="studio">
            <Link href={`/${STUDIO_ROUTE}`}>Studio</Link>
          </li>
          <li key="user">
            <Link href={`/${USER_ROUTE}`}>Account</Link>
          </li>
          <li key="logout">
            <button type="button" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;
