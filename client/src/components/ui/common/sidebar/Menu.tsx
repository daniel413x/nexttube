import { FC } from 'react';
import { IconType } from 'react-icons';
import { IMenuItem } from '@types';
import useBreakpoints from '@hooks/useBreakpoints';
import IconSpan from '../IconSpan';
import Line from '../Line';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

interface MenuProps {
  items: IMenuItem[] | [];
  title: string;
  mobileIcon?: IconType;
}

const Menu: FC<MenuProps> = ({ items = [], title, mobileIcon }: MenuProps) => {
  const { lg } = useBreakpoints();
  return (
    <nav className={styles.menu}>
      <div className={styles.label}>
        {lg && <h3 className={styles.title}>{title}</h3>}
        {!lg && mobileIcon && (
          <IconSpan className={styles.mobileIcon} Icon={mobileIcon} />
        )}
      </div>
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
};

Menu.defaultProps = {
  mobileIcon: undefined,
};

export default Menu;
