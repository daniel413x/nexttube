import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '@components/ui/common/Button';
import Input from '@components/ui/common/Input';
import SectionHeader from '@components/ui/common/SectionHeader';
import { IUserDto } from '@types';
import useUser from '@hooks/useUser';
import userApi from '@store/api/user';
import { createUserDto, toastSuccess } from '@utils';
import styles from '../CommonStyles.module.scss';

const UsernameUpdateForm: FC = () => {
  const user = useUser();
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
  } = useForm<IUserDto>({
    mode: 'onChange',
  });
  const newUsername = watch('username');
  const [updateUser, { isLoading }] = userApi.useUpdateUserMutation();
  const onSubmit: SubmitHandler<IUserDto> = (data) => {
    updateUser({ ...createUserDto(user), ...data })
      .unwrap()
      .then(() => {
        toastSuccess('Information updated');
      });
  };
  useEffect(() => {
    if (user.id) {
      setValue('username', user.username);
    }
  }, [setValue, user.id, user.username]);
  return (
    <form className={styles.userPage} onSubmit={handleSubmit(onSubmit)}>
      <SectionHeader title="Edit your username" />
      <Input
        className={styles.input}
        {...register('username', {
          required: 'Required',
        })}
        placeholder="Name"
        error={errors.username}
        defaultValue={user.username}
      />
      <div className={styles.info}>
        <span>Changing your username will affect your channel name:</span>
        <span>{`/c/${newUsername || user.username}`}</span>
      </div>
      <Button type="submit" disabled={isLoading}>
        Save
      </Button>
    </form>
  );
};

export default UsernameUpdateForm;
