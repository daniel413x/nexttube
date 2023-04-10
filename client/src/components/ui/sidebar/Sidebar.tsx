import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styles from './Sidebar.module.scss';

const links = [
  {
    href: '/projects',
    label: 'Projects',
  },
  {
    href: '/',
    label: 'Home',
  },
];

const Navbar: FC = () => {
  const { pathname } = useRouter();
  return (
    <nav className={styles.header}>
      <ul>
        {links.map(({ href, label }) => (
          <Link
            className={`${styles.link}
            ${href === pathname ? styles['--active'] : ''}`}
            href={href}
            key={href}
          >
            {label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
