import { FC } from 'react';
import GenericLayout from '@components/layouts/GenericLayout';
import TopRow from '@components/ui/c/TopRow';
import Catalog from '@components/ui/home/Catalog';
import { IChannelProps } from '@types';

const ChannelScreen: FC<IChannelProps> = ({ user }) => {
  const { username, description, videos } = user;
  return (
    <GenericLayout title={username}>
      <div className="mb-10 w-1/3">
        <TopRow user={user} />
        <article>{description}</article>
      </div>
      <Catalog videos={videos || []} />
    </GenericLayout>
  );
};

export default ChannelScreen;
