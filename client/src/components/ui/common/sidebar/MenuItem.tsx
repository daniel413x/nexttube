import { CHANNEL_ROUTE } from '@data/consts';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { IMenuItem } from '@types';
import useUser from '@hooks/useUser';
import IconSpan from '../IconSpan';
import styles from './MenuItem.module.scss';

const MenuItem: FC<IMenuItem> = ({ href, title, Icon, image }) => {
  const user = useUser();
  const { asPath } = useRouter();
  let isActive = asPath.startsWith(`${href}/`) || asPath === href;
  const isChannel = href === `/${CHANNEL_ROUTE}`;
  const isMyChannel = asPath === `/${href}/${user.username}`;
  if (isChannel && !isMyChannel) {
    isActive = false;
  }
  const dontRender = isChannel && !user?.id;
  if (dontRender) {
    return null;
  }
  return (
    <Link
      className={`${styles.menuItem} ${isActive ? styles.active : ''}`}
      href={isChannel ? `${href}/${user!.username}` : href}
    >
      {Icon && <IconSpan Icon={Icon} className={styles.iconSpan} />}
      {image && (
        <span className={styles.image}>
          {image && <Image src={image} width={40} height={40} alt={title} />}
        </span>
      )}
      <span className={styles.title}>{title}</span>
    </Link>
  );
};

export default MenuItem;
