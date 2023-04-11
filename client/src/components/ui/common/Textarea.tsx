import { TextareaHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import styles from './Textarea.module.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError | undefined;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, ...props }, passedInRef) => (
    <div className={styles.textarea}>
      <textarea ref={passedInRef} {...props} />
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  )
);

Textarea.defaultProps = {
  error: undefined,
};

export default Textarea;
