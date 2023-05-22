import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { IVideo } from '@types';
import useFocused from '@hooks/useFocused';
import UserAvatar from '../UserAvatar';
import VideoDuration from './VideoDuration';
import styles from './VideoItem.module.scss';
import VideoStatistics from './VideoStatistics';

interface VideoItemLargeProps {
  video: IVideo;
}

const VideoItemLarge: FC<VideoItemLargeProps> = ({ video }) => {
  const { ref, focused } = useFocused();
  const { name, thumbnailPath, duration, id, viewsCount, createdAt } = video;
  return (
    <div
      className={cn(styles.videoItem, styles.large, {
        [styles.focused]: focused,
      })}
    >
      <Link
        className={styles.aOverlay}
        ref={ref}
        title={name}
        href={`/v/${id}`}
      />
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
          <span className={styles.name}>{name}</span>
          {video.user && <UserAvatar user={video.user} isWhite />}
          <div className={styles.author}>
            {video.user?.username}
            <VideoStatistics viewsCount={viewsCount} createdAt={createdAt} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoItemLarge;
