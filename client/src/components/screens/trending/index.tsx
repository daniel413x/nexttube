import { FC } from 'react';
import GenericLayout from '@components/layouts/GenericLayout';
import Catalog from '@components/ui/home/Catalog';
import { ITrendingProps } from '@types';
import styles from './index.module.scss';

const TrendingScreen: FC<ITrendingProps> = ({ trendingVideos }) => (
  <GenericLayout title="Trending" className={styles.trendingScreen}>
    <Catalog videos={trendingVideos || []} />
  </GenericLayout>
);

export default TrendingScreen;
