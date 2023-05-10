import cn from 'classnames';
import { FC } from 'react';
import SectionHeader from '@components/ui/common/SectionHeader';
import styles from './AccountHome.module.scss';

const AccountHome: FC = () => (
  <div className={cn(styles.accountHome, styles.userPage)}>
    <SectionHeader title="Your account" />
    <span className={styles.info}>Select an item from the sidebar</span>
  </div>
);

export default AccountHome;
