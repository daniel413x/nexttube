import { FC } from 'react';
import { IMenuItem } from '@types';
import Line from '../Line';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

interface MenuProps {
  items: IMenuItem[] | [];
  title: string;
}

const Menu: FC<MenuProps> = ({ items = [], title }: MenuProps) => (
  <nav className={styles.menu}>
    <h3>{title}</h3>
    <ul className={styles.itemsUl}>
      {items.map(({ href, title: itemTitle, Icon, image }) => (
        <li key={href}>
          <MenuItem href={href} title={itemTitle} Icon={Icon} image={image} />
        </li>
      ))}
    </ul>
    <Line />
  </nav>
);

export default Menu;
