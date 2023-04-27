import { GetStaticProps, NextPage } from 'next';
import TrendingScreen from '@components/screens/trending/TrendingScreen';
import { ITrendingProps } from '@types';
import VideoService from '@services/videoService';

const TrendingPage: NextPage<ITrendingProps> = (props) => (
  <TrendingScreen {...props} />
);

export const getStaticProps: GetStaticProps = async () => {
  try {
    const trendingVideos = await VideoService.getMostViewed();
    return {
      props: {
        trendingVideos,
      } as ITrendingProps,
    };
  } catch (e) {
    return {
      props: {} as ITrendingProps,
    };
  }
};

export default TrendingPage;
