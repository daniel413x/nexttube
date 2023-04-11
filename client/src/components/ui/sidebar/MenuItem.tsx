import { MY_CHANNEL } from '@data/consts';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { IMenuItem } from '@types';
import useAuth from '@hooks/useAuth';
import IconSpan from '../common/IconSpan';
import styles from './MenuItem.module.scss';

const MenuItem: FC<IMenuItem> = ({ href, title, Icon, image }) => {
  const { user } = useAuth();
  const { asPath } = useRouter();
  const [resolvedHref, setResolvedHref] = useState<string>(href);
  if (href === `/${MY_CHANNEL}`) {
    if (!user) {
      return null;
    }
    setResolvedHref(`/c/${user.id}`);
  }
  return (
    <Link
      className={`${styles['menu-item']} ${
        asPath === href ? styles.active : ''
      }`}
      href={resolvedHref}
    >
      {Icon && <IconSpan Icon={Icon} className={styles['icon-span']} />}
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
