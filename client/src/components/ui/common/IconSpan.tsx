import { FC } from 'react';
import { IconType } from 'react-icons';
import styles from './IconSpan.module.scss';

interface IconProps {
  className?: string;
  Icon: IconType;
}

const IconSpan: FC<IconProps> = ({ className, Icon }) => (
  <span className={`${styles['icon-span']} ${className}`}>
    <Icon />
  </span>
);

IconSpan.defaultProps = {
  className: '',
};

export default IconSpan;
