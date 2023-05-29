import { EDIT, VIDEO_ROUTE } from '@data/consts';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IVideo } from '@types';
import useFocused from '@hooks/useFocused';
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
  transition?: boolean;
}

const VideoItemSmall: FC<VideoItemProps> = ({
  isSmall,
  isUpdateLink,
  removeHandler,
  video,
  placeholder,
  transition = false,
}) => {
  const [hide, setHide] = useState<boolean>(transition);
  const { push } = useRouter();
  const { id, thumbnailPath, name, duration, viewsCount, createdAt } = video;
  const { ref, focused } = useFocused();
  useEffect(() => {
    if (transition) {
      setHide(false);
    }
  }, [transition]);
  return (
    <div
      className={cn(styles.videoItem, {
        [styles.small]: isSmall,
        [styles.placeholder]: placeholder,
        [styles.focused]: focused,
        [styles.hide]: hide,
      })}
    >
      <Link
        className={styles.aOverlay}
        tabIndex={placeholder ? -1 : undefined}
        ref={ref}
        title={name}
        href={`/v/${id}`}
      />
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
            <Image
              src={thumbnailPath}
              alt={name}
              width={640}
              height={360}
              layout="responsive"
              priority
            />
          )}
          {placeholder && (
            <Image
              src={placeholderThumbnail}
              alt="Placeholder"
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
      </div>
    </div>
  );
};

VideoItemSmall.defaultProps = {
  removeHandler: undefined,
  isUpdateLink: false,
  placeholder: false,
  isSmall: undefined,
  transition: false,
};

export default VideoItemSmall;
