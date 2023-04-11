import cn from 'classnames';
import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { Children } from '@types';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: Children;
  type?: 'button' | 'submit';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, type = 'button', ...rest }, passedInRef) => (
    <button
      className={cn(styles.button, className)}
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
};

export default Button;
