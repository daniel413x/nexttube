import { FC } from 'react';
import { IconType } from 'react-icons';
import styles from './IconSpan.module.scss';

interface IconSpanProps {
  className?: string;
  Icon: IconType;
}

const IconSpan: FC<IconSpanProps> = ({ className, Icon }) => (
  <span className={`${styles['icon-span']} ${className || ''}`}>
    <Icon />
  </span>
);

IconSpan.defaultProps = {
  className: '',
};

export default IconSpan;
