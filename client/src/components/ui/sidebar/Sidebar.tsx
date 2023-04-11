import { sidebarMenuItems } from '@data/arrays';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import logo from '@public/logos/nexttube-logo-lg.png';
import Menu from './Menu';
import styles from './Sidebar.module.scss';

const Sidebar: FC = () => (
  <aside className={styles.sidebar}>
    <Link className={styles.logo} href="/">
      <Image width={155} height={29} src={logo} alt="NextTube logo" />
    </Link>
    <Menu title="Menu" items={sidebarMenuItems} />
    <span className={styles.copy}>
      &copy; 2022 NextTube 1.0 <br /> by Daniel Maramba <br />{' '}
      [danielmaramba.com]
    </span>
  </aside>
);

export default Sidebar;
