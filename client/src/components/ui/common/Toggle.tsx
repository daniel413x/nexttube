import { Switch } from '@headlessui/react';
import cn from 'classnames';
import { FC } from 'react';
import styles from './Toggle.module.scss';

interface ToggleProps {
  isEnabled: boolean;
  clickHandler: () => void;
  label: string;
}

const Toggle: FC<ToggleProps> = ({ isEnabled, clickHandler, label }) => (
  <Switch.Group as="div" className={styles.toggle}>
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
    <Switch.Label as="span" className={styles.label}>
      <span>{label}</span>
    </Switch.Label>
  </Switch.Group>
);

export default Toggle;
