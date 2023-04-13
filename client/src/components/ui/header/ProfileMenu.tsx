import api from '@store/api';
import Image from 'next/image';
import { FC } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import useAuth from '@hooks/useAuth';
import useOutside from '@hooks/useOutside';
import defaultAvatar from '@public/images/default-avatar.png';
import IconSpan from '../common/IconSpan';
import styles from './ProfileMenu.module.scss';

const ProfileMenu: FC = () => {
  const { user } = useAuth();
  const { data, isLoading } = api.useGetProfileQuery(null, {
    skip: !user,
  });
  const { show, setShow, ref } = useOutside(false);
  return isLoading ? null : (
    <div className={styles.wrapper} ref={ref}>
      <button onClick={() => setShow(!show)} type="button">
        <Image
          src={data?.avatarPath || defaultAvatar}
          alt={data?.name || 'Avatar'}
          width={40}
          height={40}
          priority
        />
        <span className={styles.name}>{data?.name}</span>
        <IconSpan Icon={show ? HiChevronUp : HiChevronDown} />
      </button>
    </div>
  );
};

export default ProfileMenu;
