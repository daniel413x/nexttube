import { FC } from 'react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { IoMdSend } from 'react-icons/io';
import Button from '@components/ui/common/Button';
import { ICommentDto } from '@types';
import useUser from '@hooks/useUser';
import commentApi from '@store/api/comment';
import IconSpan from '../../common/IconSpan';
import Input from '../../common/Input';
import styles from './CommentForm.module.scss';

interface CommentFormProps {
  videoId: string;
  setShowRegisterModal: () => void;
}

const CommentForm: FC<CommentFormProps> = ({
  videoId,
  setShowRegisterModal,
}) => {
  const user = useUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ICommentDto>({
    mode: 'onChange',
  });
  const [writeComment, { isLoading }] = commentApi.useCreateCommentMutation();
  const onSubmit: SubmitHandler<ICommentDto> = async (data) => {
    writeComment({ ...data, videoId })
      .unwrap()
      .then(() => reset());
  };
  return (
    <form className={styles.commentForm} onSubmit={handleSubmit(onSubmit)}>
      <Input
        error={errors.message as FieldError}
        placeholder="Enter a comment"
        {...register('message', {
          required: 'Comment body required',
        })}
      />
      <Button
        color="blank"
        className={styles.submitButton}
        disabled={isLoading}
        type={!user.id ? 'button' : 'submit'}
        onClick={!user.id ? setShowRegisterModal : undefined}
      >
        <IconSpan Icon={IoMdSend} />
      </Button>
    </form>
  );
};

export default CommentForm;
