import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';
import sidebarStyles from '../sidebar/Sidebar.module.scss';
import IconSpan from './IconSpan';
import styles from './SocialMedia.module.scss';

const SocMediaIcons = () => (
  <ul className={`${styles.socialMedia} ${sidebarStyles.socialMedia}`}>
    <li>
      <Link className={styles.icon} href="http://localhost:3000">
        <IconSpan Icon={FaInstagram} />
      </Link>
    </li>
    <li>
      <Link className={styles.icon} href="http://localhost:3000">
        <IconSpan Icon={FaTwitter} />
      </Link>
    </li>
    <li>
      <Link className={styles.icon} href="http://localhost:3000">
        <IconSpan Icon={FaTiktok} />
      </Link>
    </li>
    <li>
      <Link className={styles.icon} href="http://localhost:3000">
        <IconSpan Icon={FaFacebook} />
      </Link>
    </li>
  </ul>
);

export default SocMediaIcons;
