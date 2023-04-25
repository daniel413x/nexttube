import cn from 'classnames';
import { useRouter } from 'next/router';
import { FC } from 'react';
import GenericLayout from '@components/layouts/GenericLayout';
import Comments from '@components/ui/comments/Comments';
import VideoPlayer from '@components/ui/v/VideoPlayer';
import { IVideo } from '@types';
import videoApi from '@store/api/video';
import styles from './index.module.scss';

const VideoScreen: FC = () => {
  const { query } = useRouter();
  const { data: video = {} as IVideo } = videoApi.useGetVideoByIdQuery(
    query.id as string,
    {
      skip: !query?.id,
    }
  );
  const { name, videoPath, id, comments } = video;
  return (
    <GenericLayout title={name}>
      <div className={styles.videoScreen}>
        {video && <VideoPlayer videoPath={videoPath} />}
        <Comments comments={comments || []} videoId={id} />
      </div>
      <div className={cn(styles.video, 'mt-7')}>
        <div>fd</div>
      </div>
    </GenericLayout>
  );
};

export default VideoScreen;
