import { TextareaHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import styles from './Textarea.module.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError | undefined;
  label?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, label, ...props }, passedInRef) => (
    <div className={styles.textarea}>
      {label && (
        <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>
      )}
      <textarea ref={passedInRef} {...props} />
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  )
);

Textarea.defaultProps = {
  error: undefined,
  label: '',
};

export default Textarea;
