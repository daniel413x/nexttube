import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FC } from 'react';
import { formatNumber } from '@utils';
import styles from './VideoStatistics.module.scss';

interface VideoStatisticsProps {
  viewsCount: number;
  createdAt?: Date;
  placeholder?: boolean;
}

dayjs.extend(relativeTime);

const VideoStatistics: FC<VideoStatisticsProps> = ({
  viewsCount,
  createdAt,
  placeholder,
}) => (
  <div className={styles.videoStatistics}>
    {!placeholder && (
      <>
        <div className={styles.views}>{formatNumber(viewsCount)} views</div>
        {!!createdAt && (
          <>
            <div className={styles.seperator}>&middot;</div>
            <div className={styles.date}>
              {dayjs(new Date(createdAt)).fromNow()}
            </div>
          </>
        )}
      </>
    )}
  </div>
);

VideoStatistics.defaultProps = {
  createdAt: undefined,
  placeholder: false,
};

export default VideoStatistics;
