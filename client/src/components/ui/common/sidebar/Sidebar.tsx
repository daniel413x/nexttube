import { sidebarMenuItems } from '@data/arrays';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import useUser from '@hooks/useUser';
import logo from '@public/logos/nexttube-logo-lg.png';
import SocialMedia from '../SocialMedia';
import Menu from './Menu';
import styles from './Sidebar.module.scss';

const Sidebar: FC = () => {
  const user = useUser();
  const renderSubscriptions = user?.id && user?.subscriptions.length > 0;
  return (
    <aside className={styles.sidebar}>
      <div className={styles.upper}>
        <Link className={styles.logo} href="/">
          <Image width={155} height={29} src={logo} alt="NextTube logo" />
        </Link>
        <Menu title="Menu" items={sidebarMenuItems} />
        {renderSubscriptions && (
          <Menu
            title="My subscriptions"
            items={user!.subscriptions.map(({ toChannel }) => ({
              image: toChannel.avatarPath,
              title: toChannel.username,
              href: `${toChannel.username}`,
            }))}
          />
        )}
        <span className={styles.copy}>
          &copy; 2022 NextTube 1.0 <br /> by Daniel Maramba <br /> [
          <a href="https://www.danielmaramba.com/">danielmaramba.com</a>]
        </span>
      </div>
      <div className={styles.lower}>
        <SocialMedia className={styles.socialMedia} />
        <ul className={styles.links}>
          <li>
            <Link href="/">Legal</Link>
          </li>
          &middot;
          <li>
            <Link href="/">DMCA</Link>
          </li>
          &middot;
          <li>
            <Link href="/">Contact</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
