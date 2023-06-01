import cn from 'classnames';
import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { Children } from '@types';
import styles from './Button.module.scss';
import LoaderSpinnerIcon from './LoaderSpinnerIcon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: Children;
  type?: 'button' | 'submit';
  overlay?: boolean;
  color?: 'purple' | 'lightBlue' | 'primaryBlank' | 'blank' | '';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, color, type = 'button', overlay, loading, ...rest },
    passedInRef
  ) => (
    <button
      className={cn(styles.button, styles[color || ''], className, {
        [styles.overlay]: overlay,
        [styles.loading]: loading,
      })}
      disabled={loading}
      // eslint-disable-next-line react/button-has-type
      type={type || 'button'}
      ref={passedInRef}
      {...rest}
    >
      {loading && <LoaderSpinnerIcon />}
      {children}
    </button>
  )
);

Button.defaultProps = {
  children: undefined,
  type: 'button',
  color: '',
  overlay: false,
  loading: false,
};

export default Button;
