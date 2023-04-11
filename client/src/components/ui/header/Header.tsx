import { FC } from 'react';
import Searchbar from '../common/Searchbar';
import styles from './Header.module.scss';
import IconsRight from './IconsRight';

const Header: FC = () => (
  <header className={styles.header}>
    <Searchbar />
    <IconsRight />
  </header>
);

export default Header;
