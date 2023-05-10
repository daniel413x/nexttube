import cn from 'classnames';
import { InputHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { SCSSModule } from '@types';
import { cobbleStyles } from '@utils';
import defaultStyles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | undefined;
  label?: string;
  parentStyles?: SCSSModule;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { error, type = 'text', label, className, parentStyles, ...props },
    passedInRef
  ) => {
    const styles = cobbleStyles(defaultStyles, parentStyles);
    return (
      <div className={cn(styles.input, className)}>
        {label && <span className={styles.label}>{label}</span>}
        <input ref={passedInRef} type={type} {...props} />
        {error && <div className={styles.error}>{error.message}</div>}
      </div>
    );
  }
);

Input.defaultProps = {
  error: undefined,
  parentStyles: undefined,
  label: '',
};

export default Input;
