import { FC } from 'react';
import MainLayout from '@components/layouts/MainLayout';
import TopRow from '@components/ui/c/TopRow';
import Catalog from '@components/ui/common/Catalog';
import { IChannelProps } from '@types';

const ChannelScreen: FC<IChannelProps> = ({ user }) => {
  const { username, description, videos } = user;
  return (
    <MainLayout title={username}>
      <div className="mb-10">
        <TopRow user={user} />
        <article className="mt-5">{description}</article>
      </div>
      <Catalog videos={videos || []} />
    </MainLayout>
  );
};

export default ChannelScreen;
