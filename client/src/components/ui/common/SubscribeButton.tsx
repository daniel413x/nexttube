import cn from 'classnames';
import { FC } from 'react';
import { FaBell, FaCheck } from 'react-icons/fa';
import { SCSSModule } from '@types';
import useUser from '@hooks/useUser';
import userApi from '@store/api/user';
import { cobbleStyles, toastSuccess } from '@utils';
import Button from './Button';
import IconSpan from './IconSpan';
import defaultStyles from './SubscribeButton.module.scss';

interface SubscribeButtonProps {
  idForSubscription: string;
  iconClassName?: string;
  subscribedClassName?: string;
  className?: string;
  parentStyles?: SCSSModule;
  setShowRegisterModal?: () => void;
}

const SubscribeButton: FC<SubscribeButtonProps> = ({
  idForSubscription,
  iconClassName,
  subscribedClassName,
  className,
  parentStyles,
  setShowRegisterModal,
}) => {
  const styles = cobbleStyles(defaultStyles, parentStyles);
  const user = useUser();
  const [subscribe, { isLoading, data }] =
    userApi.useSubscribeToChannelMutation();
  if (user?.id === idForSubscription) {
    return null;
  }
  const isSubscribed =
    user?.subscriptions.some((sub) => sub.toChannel.id === idForSubscription) ||
    !!data;
  const handleSubscribe = async () => {
    await subscribe(idForSubscription).unwrap();
    if (isSubscribed) {
      toastSuccess('You were unsubscribed', { progressBar: false });
    } else {
      toastSuccess('You are subscribed', { progressBar: false });
    }
  };
  return (
    <Button
      type="button"
      className={cn(className, styles.subscribeButton, {
        [subscribedClassName || styles.subscribed]: isSubscribed,
      })}
      onClick={!user.id ? setShowRegisterModal : handleSubscribe}
      loading={isLoading}
    >
      <IconSpan
        className={iconClassName}
        Icon={isSubscribed ? FaCheck : FaBell}
      />
      <span className={styles.text}>
        {isSubscribed ? 'Subscribed' : 'Subscribe'}
      </span>
    </Button>
  );
};

SubscribeButton.defaultProps = {
  iconClassName: '',
  subscribedClassName: '',
  className: '',
  parentStyles: undefined,
  setShowRegisterModal: undefined,
};

export default SubscribeButton;
