import { FC } from 'react';
import GenericLayout from '@components/layouts/GenericLayout';
import Menu from '@components/ui/common/sidebar/Menu';
import useUser from '@hooks/useUser';

const SubscriptionsScreen: FC = () => {
  const user = useUser();
  return (
    <GenericLayout title="Subscriptions">
      {user.id && (
        <Menu
          title="My subscriptions"
          items={user.subscriptions.map(({ toChannel }) => ({
            image: toChannel.avatarPath,
            title: toChannel.username,
            href: `${toChannel.username}`,
          }))}
        />
      )}
    </GenericLayout>
  );
};

export default SubscriptionsScreen;
