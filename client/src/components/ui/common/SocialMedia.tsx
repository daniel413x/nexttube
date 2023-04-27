import cn from 'classnames';
import Link from 'next/link';
import { FC } from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';
import IconSpan from './IconSpan';
import styles from './SocialMedia.module.scss';

interface SocialMediaProps {
  className?: string;
}

const SocialMedia: FC<SocialMediaProps> = ({ className }) => (
  <ul className={cn(className, styles.socialMedia)}>
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

SocialMedia.defaultProps = {
  className: '',
};

export default SocialMedia;
