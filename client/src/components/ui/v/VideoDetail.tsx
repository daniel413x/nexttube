import cn from 'classnames';
import dayjs from 'dayjs';
import { FC } from 'react';
import { FaCheck } from 'react-icons/fa';
import { HiCalendar } from 'react-icons/hi';
import { IoMdEye } from 'react-icons/io';
import { RiHeart2Fill } from 'react-icons/ri';
import { IUser, IVideo } from '@types';
import useUser from '@hooks/useUser';
import videoApi from '@store/api/video';
import { formatNumber, toastSuccess } from '@utils';
import Button from '../common/Button';
import ChannelInfoSmall from '../common/ChannelInfoSmall';
import IconSpan from '../common/IconSpan';
import SubscribeButton from '../common/SubscribeButton';
import styles from './VideoDetail.module.scss';

interface VideoDetailProps {
  video: IVideo;
  channel: IUser;
  setShowRegisterModal: () => void;
}

const VideoDetail: FC<VideoDetailProps> = ({
  video,
  channel,
  setShowRegisterModal,
}) => {
  const user = useUser();
  const [updateLike, { isLoading: isLikeLoading }] =
    videoApi.useUpdateLikesMutation();
  const { data: hasLiked } = videoApi.useCheckUserLikeQuery(
    {
      videoId: video.id as string,
      userId: user.id as string,
    },
    {
      skip: !user?.id || !video.id,
    }
  );
  const handleLike = async () => {
    await updateLike({ videoId: video.id, userId: user.id }).unwrap();
    if (hasLiked) {
      toastSuccess('You unliked this video', { progressBar: false });
    } else {
      toastSuccess('You liked this video', { progressBar: false });
    }
  };
  const {
    name,
    description,
    user: { id: userId },
    viewsCount,
    likes,
    createdAt,
  } = video;
  const showLike = hasLiked && user.id;
  return (
    <div className={styles.videoDetail}>
      <div className={styles.leftCol}>
        <ChannelInfoSmall channel={channel} />
        <h1>{name}</h1>
        <article className={styles.article}>{description}</article>
      </div>
      <div className={styles.rightCol}>
        <div className={styles.buttonsWrapper}>
          <SubscribeButton
            idForSubscription={userId}
            parentStyles={styles}
            setShowRegisterModal={setShowRegisterModal}
          />
          <Button
            className={cn(styles.likeButton, {
              [styles.liked]: showLike,
            })}
            onClick={!user.id ? setShowRegisterModal : handleLike}
            type="button"
            loading={isLikeLoading}
          >
            {showLike && (
              <IconSpan Icon={FaCheck} className={styles.checkIcon} />
            )}
            <IconSpan Icon={RiHeart2Fill} />
          </Button>
        </div>
        <div className={styles.numberInfo}>
          <div>
            <IoMdEye />
            <span>{formatNumber(viewsCount)} views</span>
          </div>
          <div>
            <RiHeart2Fill />
            <span>{formatNumber(likes) || 0} likes</span>
          </div>
          <div>
            <HiCalendar />
            <span>{dayjs(new Date(createdAt!)).fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
