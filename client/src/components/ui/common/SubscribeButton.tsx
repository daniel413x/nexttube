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
}

const SubscribeButton: FC<SubscribeButtonProps> = ({
  idForSubscription,
  iconClassName,
  subscribedClassName,
  className,
  parentStyles,
}) => {
  const styles = cobbleStyles(defaultStyles, parentStyles);
  const user = useUser();
  if (user?.id === idForSubscription) {
    return null;
  }
  const [subscribe, { isLoading, data }] =
    userApi.useSubscribeToChannelMutation();
  const isSubscribed =
    user?.subscriptions.some((sub) => sub.toChannel.id === idForSubscription) ||
    !!data;
  const handleSubscribe = async () => {
    await subscribe(idForSubscription).unwrap();
    if (isSubscribed) {
      toastSuccess('You were unsubscribed');
    } else {
      toastSuccess('You are subscribed');
    }
  };
  return (
    <Button
      type="button"
      className={cn(className, styles.subscribeButton, {
        [subscribedClassName || styles.subscribed]: isSubscribed,
      })}
      onClick={handleSubscribe}
      disabled={isLoading}
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
};

export default SubscribeButton;
