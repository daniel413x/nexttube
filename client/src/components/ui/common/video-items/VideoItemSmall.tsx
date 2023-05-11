import { EDIT, VIDEO_ROUTE } from '@data/consts';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IVideo } from '@types';
import placeholderThumbnail from '@public/images/placeholder-thumbnail.png';
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
  placeholder?: boolean;
}

const VideoItem: FC<VideoItemProps> = ({
  isSmall,
  isUpdateLink,
  removeHandler,
  video,
  placeholder,
}) => {
  const { push } = useRouter();
  const { id, thumbnailPath, name, duration, viewsCount, createdAt } = video;
  return (
    <div
      className={cn(styles.videoItem, {
        [styles.small]: isSmall,
        [styles.placeholder]: placeholder,
      })}
    >
      <div>
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
            onClick={() => push(`/${VIDEO_ROUTE}/${EDIT}/${id}`)}
            type="button"
          >
            <IconSpan className={styles.editIcon} Icon={FaEdit} />
          </button>
        )}
        <div className={styles.thumbnailWrapper}>
          {thumbnailPath && (
            <Link title={name} href={`/v/${id}`}>
              <Image
                src={thumbnailPath}
                alt={name}
                width={640}
                height={360}
                layout="responsive"
                priority
              />
            </Link>
          )}
          {placeholder && (
            <Image
              src={placeholderThumbnail}
              alt="LOlolv"
              width={640}
              height={360}
              layout="responsive"
              priority
            />
          )}
        </div>
        {!placeholder && <VideoDuration duration={duration} />}
        {!placeholder && video?.user && (
          <UserAvatar className={styles.userAvatar} user={video?.user} />
        )}
        <Link title={name} href={`/v/${id}`}>
          <div className={styles.information}>
            {!isSmall && (
              <div className={styles.author}>
                {!placeholder && video.user?.username}
              </div>
            )}
            <div className={styles.name}>{name}</div>
            <VideoStatistics
              viewsCount={viewsCount}
              createdAt={!isSmall ? createdAt : undefined}
              placeholder={placeholder}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

VideoItem.defaultProps = {
  removeHandler: undefined,
  isUpdateLink: false,
  placeholder: false,
  isSmall: undefined,
};

export default VideoItem;
