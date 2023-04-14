import { EDIT, VIDEO } from '@data/consts';
import cn from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import { IVideo } from '@types';
import IconSpan from '../IconSpan';
import VideoDuration from './VideoDuration';
import styles from './VideoItem.module.scss';

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
  const { id, thumbnailPath, name, duration } = video;
  return (
    <div
      className={cn(styles['video-small'], {
        [styles.small]: isSmall,
      })}
    >
      {!!removeHandler && (
        <button
          className={styles['remove-button']} // absolute bottom-3 right-3 z-10
          onClick={() => removeHandler(id)}
          type="button"
        >
          <IconSpan Icon={FaTrash} /> {/* text-lg text-red-700 */}
        </button>
      )}
      {isUpdateLink && (
        <button
          className={styles['update-button']} // absolute bottom-3 right-11 z-10
          onClick={() => push(`/${VIDEO}/${EDIT}/${id}`)}
          type="button"
        >
          <IconSpan Icon={FaTrash} /> {/* text-lg text-blue-600 */}
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
          />
        )}
        <VideoDuration duration={duration} />
        {video?.user?.avatarPath && (
          <div className={styles['user-avatar']}>
            {' '}
            {/* absolute right-3 -bottom-7 */}
            <UserAvatar user={video?.user} />
          </div>
        )}
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
