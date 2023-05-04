import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FC } from 'react';
import { formatNumber } from '@utils';
import styles from './VideoStatistics.module.scss';

interface VideoStatisticsProps {
  viewsCount: number;
  createdAt?: Date;
}

dayjs.extend(relativeTime);

const VideoStatistics: FC<VideoStatisticsProps> = ({
  viewsCount,
  createdAt,
}) => (
  <div className={styles.videoStatistics}>
    <div className={styles.views}>{formatNumber(viewsCount)} views</div>
    {!!createdAt && (
      <>
        <div className={styles.seperator}>&middot;</div>
        <div className={styles.date}>
          {dayjs(new Date(createdAt)).fromNow()}
        </div>
      </>
    )}
  </div>
);

VideoStatistics.defaultProps = {
  createdAt: undefined,
};

export default VideoStatistics;
