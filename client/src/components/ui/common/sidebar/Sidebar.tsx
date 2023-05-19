import { sidebarAccountItems, sidebarIndexItems } from '@data/arrays';
import { CHANNEL_ROUTE, USER_ROUTE } from '@data/consts';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { RiNotificationLine } from 'react-icons/ri';
import useBreakpoints from '@hooks/useBreakpoints';
import useUser from '@hooks/useUser';
import defaultAvatar from '@public/images/default-avatar.png';
import logo from '@public/logos/nexttube-logo-lg.png';
import SocialMedia from '../SocialMedia';
import Menu from './Menu';
import styles from './Sidebar.module.scss';

const Sidebar: FC = () => {
  const { lg } = useBreakpoints();
  const isUserPage =
    useRouter().pathname.split('/').filter(Boolean)[0] === USER_ROUTE;
  const user = useUser();
  const renderSubscriptions = user?.id && user?.subscriptions.length > 0;
  return (
    <aside className={styles.sidebar}>
      <div className={styles.upper}>
        <Link className={styles.logo} href="/">
          <Image
            width={155}
            height={29}
            src={logo}
            alt="NextTube logo"
            layout={lg ? '' : 'responsive'}
          />
        </Link>
        {isUserPage && <Menu title="Account" items={sidebarAccountItems} />}
        <Menu title="Index" items={sidebarIndexItems} />
        {renderSubscriptions && (
          <Menu
            mobileIcon={RiNotificationLine}
            title="My subscriptions"
            items={user!.subscriptions.map(({ toChannel }) => ({
              image: toChannel.avatarPath || defaultAvatar,
              title: toChannel.username,
              href: `/${CHANNEL_ROUTE}/${toChannel.username}`,
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
