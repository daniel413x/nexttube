import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { IVideo } from '@types';
import placeholderThumbnail from '@public/images/placeholder-thumbnail.png';
import UserAvatar from '../UserAvatar';
import VideoDuration from './VideoDuration';
import styles from './VideoItemListView.module.scss';
import VideoStatistics from './VideoStatistics';

interface VideoItemProps {
  video: IVideo;
}

const VideoItem: FC<VideoItemProps> = ({ video }) => {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => setShow(true), []);
  const { id, thumbnailPath, name, duration, viewsCount, createdAt } = video;
  return (
    <div
      className={cn(styles.videoItemListView, {
        [styles.show]: show,
      })}
    >
      <Link className={styles.aOverlay} title={name} href={`/v/${id}`} />
      <div className={styles.thumbnailWrapper}>
        {thumbnailPath && (
          <Image
            src={thumbnailPath || placeholderThumbnail}
            alt={name}
            width={640}
            height={360}
            layout="responsive"
            priority
          />
        )}
        <VideoDuration duration={duration} />
      </div>
      <div className={styles.information}>
        <div className={styles.name}>{name}</div>
        <VideoStatistics viewsCount={viewsCount} createdAt={createdAt} />
        <div className={styles.avatarWrapper}>
          <UserAvatar user={video?.user} />
          <span className={styles.uploaderName}>{video.user.username}</span>
        </div>
        <span className={styles.description}>{video.description}</span>
      </div>
    </div>
  );
};

export default VideoItem;
