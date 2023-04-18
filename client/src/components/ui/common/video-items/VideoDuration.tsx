import cn from 'classnames';
import { FC } from 'react';
import styles from './VideoDuration.module.scss';

interface VideoDurationProps {
  duration: number;
  isBottom?: boolean;
}

const VideoDuration: FC<VideoDurationProps> = ({ duration, isBottom }) => (
  <span
    className={cn(styles.videoDuration, {
      [styles.bottom]: isBottom,
    })}
  >
    {duration} min.
  </span>
);

VideoDuration.defaultProps = {
  isBottom: false,
};

export default VideoDuration;
