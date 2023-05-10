import { FC } from 'react';
import MainLayout from '@components/layouts/MainLayout';
import Catalog from '@components/ui/common/Catalog';
import { ITrendingProps } from '@types';

const TrendingScreen: FC<ITrendingProps> = ({ trendingVideos }) => (
  <MainLayout title="Trending">
    <Catalog videos={trendingVideos || []} />
  </MainLayout>
);

export default TrendingScreen;
