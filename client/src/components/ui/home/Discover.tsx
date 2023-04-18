import { FC } from 'react';
import { IVideo } from '@types';
import VideoItemLarge from '../common/video-items/VideoItemLarge';
import styles from './Discover.module.scss';

interface DiscoverProps {
  mostViewedVideo: IVideo;
  randomVideo: IVideo;
}

const Discover: FC<DiscoverProps> = ({ randomVideo, mostViewedVideo }) => (
  <div className={styles.discover}>
    {' '}
    <div className={styles.top}>
      <VideoItemLarge video={mostViewedVideo} />
    </div>
    <div className={styles.random}>
      <VideoItemLarge video={randomVideo} />
    </div>
  </div>
);

export default Discover;
