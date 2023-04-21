import cn from 'classnames';
import { FC } from 'react';
import { FaBell } from 'react-icons/fa';
import useUser from '@hooks/useUser';
import api from '@store/api';
import IconSpan from './IconSpan';
import styles from './SubscribeButton.module.scss';

interface SubscribeButtonProps {
  idForSubscription: string;
}

const SubscribeButton: FC<SubscribeButtonProps> = ({ idForSubscription }) => {
  const user = useUser();
  const [subscribe, { isLoading, data }] = api.useSubscribeToChannelMutation();
  if (user.id === idForSubscription) {
    return null;
  }
  const isSubscribed =
    user.subscriptions.some((sub) => sub.toChannel.id === idForSubscription) ||
    !!data;
  return (
    <button
      type="button"
      className={cn(styles.subscribeButton, {
        [styles.subscribed]: isSubscribed,
      })}
      onClick={() => subscribe(idForSubscription).unwrap()}
      disabled={isLoading}
    >
      <IconSpan Icon={FaBell} />
      {isSubscribed ? 'You subcribed' : 'Subscribe'}
    </button>
  );
};

export default SubscribeButton;
