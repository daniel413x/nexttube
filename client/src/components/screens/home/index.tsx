import { FC } from 'react';
import GenericLayout from '@components/layouts/GenericLayout';
import Catalog from '@components/ui/home/Catalog';
import Discover from '@components/ui/home/Discover';
import { IHomeProps } from '@types';

const HomeScreen: FC<IHomeProps> = ({
  newVideos,
  mostViewedVideo,
  randomVideo,
}) => (
  <GenericLayout title="NextTube">
    <Discover mostViewedVideo={mostViewedVideo} randomVideo={randomVideo} />
    <Catalog newVideos={newVideos} />
  </GenericLayout>
);

export default HomeScreen;
