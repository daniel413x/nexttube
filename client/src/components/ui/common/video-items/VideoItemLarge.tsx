import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { IVideo } from '@types';
import UserAvatar from '../UserAvatar';
import VideoDuration from './VideoDuration';
import styles from './VideoItem.module.scss';
import VideoStatistics from './VideoStatistics';

interface VideoItemLargeProps {
  video: IVideo;
}

const VideoItemLarge: FC<VideoItemLargeProps> = ({ video }) => {
  const { name, thumbnailPath, duration, id, views, createdAt } = video;
  return (
    <div className={cn(styles.videoItem, styles.large)}>
      <div className={styles.thumbnail}>
        {thumbnailPath && (
          <Image
            src={thumbnailPath}
            alt={name}
            layout="fill"
            className={styles.bgImage}
            priority
          />
        )}
        <VideoDuration isBottom duration={duration} />
        <div className={styles.information}>
          <Link href={`/v/${id}`} className={styles.name}>
            {name}
          </Link>
          {video.user && <UserAvatar user={video.user} isWhite />}
          <div className={styles.author}>
            {video.user?.name}
            <VideoStatistics views={views} createdAt={createdAt} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoItemLarge;
