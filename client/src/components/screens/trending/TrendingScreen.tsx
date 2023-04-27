import { FC } from 'react';
import GenericLayout from '@components/layouts/GenericLayout';
import Catalog from '@components/ui/home/Catalog';
import { ITrendingProps } from '@types';

const TrendingScreen: FC<ITrendingProps> = ({ trendingVideos }) => (
  <GenericLayout title="Trending">
    <Catalog videos={trendingVideos || []} />
  </GenericLayout>
);

export default TrendingScreen;
