import { placeholderVideo } from '@data/state';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import GenericLayout from '@components/layouts/GenericLayout';
import VideoDetail from '@components/ui/v/VideoDetail';
import VideoPlayer from '@components/ui/v/VideoPlayer';
import Comments from '@components/ui/v/comments/Comments';
import { IVideo } from '@types';
import videoApi from '@store/api/video';
import styles from './VideoScreen.module.scss';

const VideoScreen: FC = () => {
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
  }, [query.id]);
  if (!video) {
    return null;
  }
  const { name, videoPath, id, comments, user } = video as IVideo;
  return (
    <GenericLayout title={name}>
      <div className={styles.row}>
        {video && <VideoPlayer videoPath={videoPath} />}
        <Comments comments={comments || []} videoId={id} />
      </div>
      <div className={`${styles.row} ${styles.lowerRow}`}>
        <VideoDetail video={video} channel={user} />
        <div />
      </div>
    </GenericLayout>
  );
};

export default VideoScreen;