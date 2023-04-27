import shuffle from 'lodash/shuffle';
import { GetStaticProps, NextPage } from 'next';
import HomeScreen from '@components/screens/home/HomeScreen';
import { IHomeProps, IVideo } from '@types';
import VideoService from '@services/videoService';

const HomePage: NextPage<IHomeProps> = (props) => <HomeScreen {...props} />;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const newVideos = await VideoService.getAll();
    const mostViewedVideos = await VideoService.getMostViewed();
    return {
      props: {
        newVideos,
        mostViewedVideo: mostViewedVideos[0],
        randomVideo:
          shuffle(
            newVideos.filter((v) => v.id !== mostViewedVideos[0].id)
          )[0] || ({} as IVideo),
      } as IHomeProps,
    };
  } catch (e) {
    return {
      props: {
        newVideos: [],
        mostViewedVideo: {} as IVideo,
        randomVideo: {} as IVideo,
      } as IHomeProps,
    };
  }
};

export default HomePage;
