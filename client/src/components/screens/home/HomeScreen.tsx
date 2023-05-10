import { FC } from 'react';
import MainLayout from '@components/layouts/MainLayout';
import Catalog from '@components/ui/common/Catalog';
import Discover from '@components/ui/home/Discover';
import { IHomeProps } from '@types';

const HomeScreen: FC<IHomeProps> = ({
  newVideos,
  mostViewedVideo,
  randomVideo,
}) => (
  <MainLayout title="Home">
    <Discover mostViewedVideo={mostViewedVideo} randomVideo={randomVideo} />
    <Catalog videos={newVideos} />
  </MainLayout>
);

export default HomeScreen;
