import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import useActions from '@hooks/useActions';
import useAuth from '@hooks/useAuth';
import useOutside from '@hooks/useOutside';
import api from '@store/api';
import defaultAvatar from '@public/images/default-avatar.png';
import IconSpan from '../common/IconSpan';
import styles from './ProfileMenu.module.scss';

const ProfileMenu: FC = () => {
  const { user } = useAuth();
  const { logout } = useActions();
  const { data, isLoading } = api.useGetProfileQuery(null, {
    skip: !user,
  });
  const { show, setShow, ref } = useOutside(false);
  return isLoading ? null : (
    <div className={styles['profile-menu']} ref={ref}>
      <button onClick={() => setShow(!show)} type="button">
        <Image
          src={data?.avatarPath || defaultAvatar}
          alt={data?.name || 'Avatar'}
          width={40}
          height={40}
          priority
        />
        <span className={styles.name}>{data?.name || 'User'}</span>
        <IconSpan Icon={show ? HiChevronUp : HiChevronDown} />
      </button>
      {show && (
        <ul className={styles['items-ul']}>
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
