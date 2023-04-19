import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import ChannelScreen from '@components/screens/channel';
import { IChannelProps, IUser } from '@types';
import UserService from '@services/userService';

const ChannelPage: NextPage<IUser> = (user) => <ChannelScreen channel={user} />;

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
        channel: user,
      } as IChannelProps,
    };
  } catch (e) {
    return {
      props: {
        channel: {} as IUser,
      },
    };
  }
};

export default ChannelPage;
