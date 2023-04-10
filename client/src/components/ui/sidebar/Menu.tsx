import { FC } from 'react';
import { IMenuItem } from '@types';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Line from './Line';

interface MenuProps {
  items: IMenuItem[];
  title: string;
}

const Menu: FC<MenuProps> = ({ items, title }: MenuProps) => (
  <div className={styles.menu}>
    <h3>{title}</h3>
    <ul className={styles['items-ul']}>
      {items.map(({ href, title: itemTitle, Icon, image }) => (
        <li key={href}>
          <MenuItem href={href} title={itemTitle} Icon={Icon} image={image} />
        </li>
      ))}
    </ul>
    <Line />
  </div>
);

export default Menu;
