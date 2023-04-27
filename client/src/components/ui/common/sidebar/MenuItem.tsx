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
  const isActive = asPath.startsWith(`${href}/`) || asPath === href;
  const myChannel = href === '/c';
  const dontRender = myChannel && !user.id;
  if (dontRender) {
    return null;
  }
  return (
    <Link
      className={`${styles.menuItem} ${isActive ? styles.active : ''}`}
      href={myChannel ? `${href}/${user!.username}` : href}
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
