import { Switch } from '@headlessui/react';
import cn from 'classnames';
import { FC } from 'react';
import Button from '../../Button';
import styles from './TogglePublic.module.scss';

interface TogglePublicProps {
  isEnabled: boolean;
  clickHandler: () => void;
}

const TogglePublic: FC<TogglePublicProps> = ({ isEnabled, clickHandler }) => (
  <div className={styles.togglePublic}>
    <Switch
      checked={isEnabled}
      onChange={clickHandler}
      className={cn(styles.switchBg, {
        'bg-purple bg-opacity-80': isEnabled,
        'bg-gray-800': !isEnabled,
      })}
    >
      <span
        className={cn(styles.switchBall, {
          'translate-x-3': isEnabled,
          '-translate-x-2': !isEnabled,
        })}
      />
    </Switch>
    <Button onClick={clickHandler} className={styles.label}>
      <span>Public video</span>
    </Button>
  </div>
);

export default TogglePublic;
