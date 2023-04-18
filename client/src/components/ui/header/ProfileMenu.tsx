import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import useActions from '@hooks/useActions';
import useHideOnOutsideClick from '@hooks/useHideOnOutsideClick';
import useUser from '@hooks/useUser';
import defaultAvatar from '@public/images/default-avatar.png';
import IconSpan from '../common/IconSpan';
import styles from './ProfileMenu.module.scss';

const ProfileMenu: FC = () => {
  const user = useUser();
  const { logout } = useActions();
  const { show, setShow, ref } = useHideOnOutsideClick(false);
  return (
    <div className={styles.profileMenu} ref={ref}>
      <button onClick={() => setShow(!show)} type="button">
        <Image
          src={user?.avatarPath || defaultAvatar}
          alt={user?.name || 'Avatar'}
          width={40}
          height={40}
          priority
        />
        <span className={styles.name}>{user?.name || 'User'}</span>
        <IconSpan Icon={show ? HiChevronUp : HiChevronDown} />
      </button>
      {show && (
        <ul className={styles.itemsUl}>
          <li>
            <Link href={`/c/${user?.id}`}>My channel</Link>
          </li>
          <li>
            <Link href="studio">Studio</Link>
          </li>
          <li>
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
