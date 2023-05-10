import { FC } from 'react';
import MainLayout from '@components/layouts/MainLayout';
import Menu from '@components/ui/common/sidebar/Menu';
import useUser from '@hooks/useUser';

const SubscriptionsScreen: FC = () => {
  const user = useUser();
  return (
    <MainLayout title="Subscriptions">
      {user?.id && (
        <Menu
          title="My subscriptions"
          items={user.subscriptions.map(({ toChannel }) => ({
            image: toChannel.avatarPath,
            title: toChannel.username,
            href: `${toChannel.username}`,
          }))}
        />
      )}
    </MainLayout>
  );
};

export default SubscriptionsScreen;
