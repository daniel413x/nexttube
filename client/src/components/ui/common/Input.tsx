import { InputHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | undefined;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, type = 'text', ...props }, passedInRef) => (
    <div className={styles.input}>
      <input ref={passedInRef} type={type} {...props} />
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  )
);

Input.defaultProps = {
  error: undefined,
};

export default Input;
