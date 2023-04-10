import { sidebarMenuItems } from '@data/arrays';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styles from './Navbar.module.scss';

const Navbar: FC = () => {
  const { pathname } = useRouter();
  return (
    <nav className={styles.header}>
      <ul>
        {sidebarMenuItems.map(({ href, title }) => (
          <Link
            className={`${styles.link}
            ${href === pathname ? styles.active : ''}`}
            href={href}
            key={href}
          >
            {title}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
