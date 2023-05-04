import cn from 'classnames';
import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { Children } from '@types';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: Children;
  type?: 'button' | 'submit';
  overlay?: boolean;
  color?: 'purple' | 'lightBlue' | 'blank' | '';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, color, type = 'button', overlay, ...rest },
    passedInRef
  ) => (
    <button
      className={cn(styles.button, styles[color || ''], className, {
        [styles.overlay]: overlay,
      })}
      // eslint-disable-next-line react/button-has-type
      type={type || 'button'}
      ref={passedInRef}
      {...rest}
    >
      {children}
    </button>
  )
);

Button.defaultProps = {
  children: undefined,
  type: 'button',
  color: '',
  overlay: false,
};

export default Button;
