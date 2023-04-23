import cn from 'classnames';
import { useRouter } from 'next/router';
import { FC } from 'react';
import GenericLayout from '@components/layouts/GenericLayout';
import layoutStyles from '@components/layouts/VideoLayout.module.scss';
import VideoPlayer from '@components/ui/v/VideoPlayer';
import { IVideo } from '@types';
import videoApi from '@store/api/video';

const VideoScreen: FC = () => {
  const { query } = useRouter();
  const { data: video = {} as IVideo } = videoApi.useGetVideoByIdQuery(
    query.id as string,
    {
      skip: !query?.id,
    }
  );
  const { name } = video;
  return (
    <GenericLayout title={name}>
      <div className={layoutStyles.videoLayout}>
        {video && <VideoPlayer videoPath={video.videoPath} />}
        <div />
      </div>
      <div className={cn(layoutStyles.videoLayout, 'mt-7')}>
        <div>fd</div>
      </div>
    </GenericLayout>
  );
};

export default VideoScreen;
