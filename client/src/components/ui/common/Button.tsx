import React, { forwardRef, RefObject } from 'react';
import { Children } from '@types';

type ButtonStyles = 'primary' | 'secondary' | 'warn';

interface ButtonProps {
  type?: 'button' | 'submit';
  className?: string;
  onClick?: (...args: any[]) => void;
  children?: Children;
  buttonStyle?: ButtonStyles;
  title?: string;
  id?: string;
  tabIndex?: number;
}

const Button = forwardRef(({
  type,
  className,
  onClick,
  children,
  buttonStyle,
  title,
  id,
  tabIndex,
}: ButtonProps, passedInRef: any) => (
  <button
    ref={passedInRef}
    title={title}
    className={`button ${buttonStyle} ${className}`}
    // eslint-disable-next-line react/button-has-type
    type={type}
    onClick={onClick}
    id={id}
    tabIndex={tabIndex}
  >
    {children}
  </button>
));

Button.defaultProps = {
  type: 'button',
  title: '',
  className: '',
  id: undefined,
  children: false,
  onClick: () => null,
  buttonStyle: 'primary',
  tabIndex: 0,
};

export default Button as (props: ButtonProps & { ref?: RefObject<any> }) => JSX.Element;
