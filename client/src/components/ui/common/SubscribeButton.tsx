import cn from 'classnames';
import { FC } from 'react';
import { FaBell, FaCheck } from 'react-icons/fa';
import { SCSSModule } from '@types';
import useUser from '@hooks/useUser';
import userApi from '@store/api/user';
import { cobbleStyles } from '@utils';
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
  const [subscribe, { isLoading, data }] =
    userApi.useSubscribeToChannelMutation();
  if (user?.id === idForSubscription) {
    return null;
  }
  const isSubscribed =
    user?.subscriptions.some((sub) => sub.toChannel.id === idForSubscription) ||
    !!data;
  return (
    <Button
      type="button"
      className={cn(className, styles.subscribeButton, {
        [subscribedClassName || styles.subscribed]: isSubscribed,
      })}
      onClick={() => subscribe(idForSubscription).unwrap()}
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
