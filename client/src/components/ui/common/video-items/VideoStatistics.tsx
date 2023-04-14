import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FC } from 'react';
import { formatNumber } from '@utils';
import styles from './VideoStatistics.module.scss';

interface VideoStatisticsProps {
  views: number;
  createdAt?: string;
}

dayjs.extend(relativeTime);

const VideoStatistics: FC<VideoStatisticsProps> = ({ views, createdAt }) => (
  <div className={styles['number-info']}>
    <div className={styles.views}>{formatNumber(views)} views</div>
    {!!createdAt && (
      <>
        <div className={styles.seperator} />
        <div className={styles.date}>
          {/* @ts-ignore */}
          {dayjs(new Date(createdAt)).fromNow()}
        </div>
      </>
    )}
  </div>
);

VideoStatistics.defaultProps = {
  createdAt: '',
};

export default VideoStatistics;
