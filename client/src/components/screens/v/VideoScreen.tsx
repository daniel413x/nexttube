import { placeholderVideo } from '@data/state';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import MainLayout from '@components/layouts/MainLayout';
import VideoDetail from '@components/ui/v/VideoDetail';
import VideoPlayer from '@components/ui/v/VideoPlayer';
import Comments from '@components/ui/v/comments/Comments';
import { IVideo } from '@types';
import useBreakpoints from '@hooks/useBreakpoints';
import videoApi from '@store/api/video';
import styles from './VideoScreen.module.scss';

const VideoScreen: FC = () => {
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
  return (
    <MainLayout title={name}>
      <div className={styles.row}>
        {video && <VideoPlayer videoPath={videoPath} />}
        {xxl && <Comments comments={comments || []} videoId={id} />}
      </div>
      <div className={cn(styles.row, styles.lowerRow)}>
        <VideoDetail video={video} channel={user} />
        {xxl && <div />}
      </div>
      {!xxl && <Comments comments={comments || []} videoId={id} />}
    </MainLayout>
  );
};

export default VideoScreen;
