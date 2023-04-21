import { sidebarMenuItems } from '@data/arrays';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import useUser from '@hooks/useUser';
import logo from '@public/logos/nexttube-logo-lg.png';
import Menu from './Menu';
import styles from './Sidebar.module.scss';

const Sidebar: FC = () => {
  const user = useUser();
  return (
    <aside className={styles.sidebar}>
      <Link className={styles.logo} href="/">
        <Image width={155} height={29} src={logo} alt="NextTube logo" />
      </Link>
      <Menu title="Menu" items={sidebarMenuItems} />
      {user.id && (
        <Menu
          title="My subscriptions"
          items={user.subscriptions.map(({ toChannel }) => ({
            image: toChannel.avatarPath,
            title: toChannel.username,
            href: `${toChannel.username}`,
          }))}
        />
      )}
      <span className={styles.copy}>
        &copy; 2022 NextTube 1.0 <br /> by Daniel Maramba <br />{' '}
        [danielmaramba.com]
      </span>
    </aside>
  );
};

export default Sidebar;
