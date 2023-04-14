import { FC } from 'react';
import styles from './VideoItem.module.scss';

interface VideoDurationProps {
  duration: number;
  isBottom?: boolean;
}

const VideoDuration: FC<VideoDurationProps> = ({ duration, isBottom }) => (
  <span className={`${styles['icon-span']} ${isBottom ? styles.bottom : ''}`}>
    {duration}
    min.
  </span>
);

VideoDuration.defaultProps = {
  isBottom: false,
};

export default VideoDuration;
