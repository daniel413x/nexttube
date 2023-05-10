import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '@components/ui/common/Button';
import Input from '@components/ui/common/Input';
import SectionHeader from '@components/ui/common/SectionHeader';
import { IUserDto } from '@types';
import useUser from '@hooks/useUser';
import userApi from '@store/api/user';
import { createUserDto, toastSuccess } from '@utils';
import styles from '../CommonStyles.module.scss';

const PasswordUpdateForm: FC = () => {
  const user = useUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUserDto>({
    mode: 'onChange',
  });
  const [updateUser, { isLoading }] = userApi.useUpdateUserMutation();
  const onSubmit: SubmitHandler<IUserDto> = (data) => {
    updateUser({ ...createUserDto(user), ...data })
      .unwrap()
      .then(() => {
        toastSuccess('Information updated!', 'Success');
      });
  };
  return (
    <form className={styles.userPage} onSubmit={handleSubmit(onSubmit)}>
      <SectionHeader title="Edit your password" />
      <Input
        className={styles.input}
        label="New password (6-35 characters)"
        {...register('password', {
          required: 'Required',
        })}
        error={errors.password}
        defaultValue=""
        type="password"
      />
      <Input
        className={styles.input}
        label="Confirm password"
        {...register('password', {
          required: 'Required',
        })}
        error={errors.password}
        defaultValue=""
        type="password"
      />
      <Button type="submit" disabled={isLoading}>
        Save
      </Button>
    </form>
  );
};

export default PasswordUpdateForm;
