import { EDIT, VIDEO } from '@data/consts';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IVideo } from '@types';
import IconSpan from '../IconSpan';
import UserAvatar from '../UserAvatar';
import VideoDuration from './VideoDuration';
import styles from './VideoItem.module.scss';
import VideoStatistics from './VideoStatistics';

interface VideoItemProps {
  video: IVideo;
  removeHandler?: (videoId: string) => void;
  isUpdateLink?: boolean;
  isSmall?: boolean;
}

const VideoItem: FC<VideoItemProps> = ({
  isSmall,
  isUpdateLink,
  removeHandler,
  video,
}) => {
  const { push } = useRouter();
  const { id, thumbnailPath, name, duration, views, createdAt } = video;
  return (
    <div
      className={cn(styles.videoItem, {
        [styles.small]: isSmall,
      })}
      title={name}
    >
      {!!removeHandler && (
        <button
          className={styles.removeButton}
          onClick={() => removeHandler(id)}
          type="button"
        >
          <IconSpan className={styles.trashIcon} Icon={FaTrash} />
        </button>
      )}
      {isUpdateLink && (
        <button
          className={styles.updateButton}
          onClick={() => push(`/${VIDEO}/${EDIT}/${id}`)}
          type="button"
        >
          <IconSpan className={styles.editIcon} Icon={FaEdit} />
        </button>
      )}
      <div className={styles.thumbnail}>
        {thumbnailPath && (
          <Image
            src={thumbnailPath}
            alt={name}
            width={185}
            height={103}
            layout="responsive"
            priority
          />
        )}
        <VideoDuration duration={duration} />
        {video?.user && (
          <UserAvatar className={styles.userAvatar} user={video?.user} />
        )}
        <div className={styles.information}>
          {!isSmall && <div className={styles.author}>{video.user?.name}</div>}
          <Link className={styles.name} href={`/v/${id}`}>
            {name}
          </Link>
          <VideoStatistics
            views={views}
            createdAt={!isSmall ? createdAt : undefined}
          />
        </div>
      </div>
    </div>
  );
};

VideoItem.defaultProps = {
  removeHandler: undefined,
  isUpdateLink: false,
  isSmall: undefined,
};

export default VideoItem;
