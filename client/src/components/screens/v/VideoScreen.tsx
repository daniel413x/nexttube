import { placeholderVideo } from '@data/state';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import MainLayout from '@components/layouts/MainLayout';
import RegisterModal from '@components/ui/modals/RegisterModal';
import VideoDetail from '@components/ui/v/VideoDetail';
import VideoPlayer from '@components/ui/v/VideoPlayer';
import Comments from '@components/ui/v/comments/Comments';
import { IVideo } from '@types';
import useBreakpoints from '@hooks/useBreakpoints';
import videoApi from '@store/api/video';
import styles from './VideoScreen.module.scss';

const VideoScreen: FC = () => {
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const { xxl } = useBreakpoints();
  const { query } = useRouter();
  const { data: video = placeholderVideo } = videoApi.useGetVideoByIdQuery(
    query.id as string,
    {
      skip: !query?.id,
    }
  );
  const [updateViews] = videoApi.useUpdateViewsMutation();
  useEffect(() => {
    if (query.id) {
      updateViews(query.id as string);
    }
  }, [query.id, updateViews]);
  if (!video) {
    return null;
  }
  const { name, videoPath, id, comments, user } = video as IVideo;
  const CommentsJSX = (
    <Comments
      comments={comments || []}
      videoId={id}
      setShowRegisterModal={() => setShowRegisterModal(true)}
    />
  );
  return (
    <MainLayout title={name}>
      <RegisterModal
        show={showRegisterModal}
        close={() => setShowRegisterModal(false)}
      />
      <div className={styles.row}>
        {video && <VideoPlayer videoPath={videoPath} />}
        {xxl && CommentsJSX}
      </div>
      <div className={cn(styles.row, styles.lowerRow)}>
        <VideoDetail
          video={video}
          channel={user}
          setShowRegisterModal={() => setShowRegisterModal(true)}
        />
        {xxl && <div />}
      </div>
      {!xxl && CommentsJSX}
    </MainLayout>
  );
};

export default VideoScreen;
