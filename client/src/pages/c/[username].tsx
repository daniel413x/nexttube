import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import ChannelScreen from '@components/screens/c/ChannelScreen';
import { IChannelProps } from '@types';
import UserService from '@services/userService';

const ChannelPage: NextPage<IChannelProps> = (props) => (
  <ChannelScreen {...props} />
);

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const users = await UserService.getAll();
    const paths = users.map((user) => ({
      params: {
        username: user.username,
      },
    }));
    return {
      paths,
      fallback: 'blocking',
    };
  } catch (e) {
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const user = await UserService.getOne(params?.username as string);
    return {
      props: {
        user,
      } as IChannelProps,
    };
  } catch (e) {
    return {
      props: {} as IChannelProps,
    };
  }
};

export default ChannelPage;
