import { PRIVATE } from '@data/consts';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@components/ui/common/Button';
import SectionHeader from '@components/ui/common/SectionHeader';
import Toggle from '@components/ui/common/Toggle';
import { IUserDto } from '@types';
import useUser from '@hooks/useUser';
import userApi from '@store/api/user';
import { createUserDto, toastSuccess } from '@utils';
import styles from '../CommonStyles.module.scss';

const SettingsUpdateForm: FC = () => {
  const user = useUser();
  const { control, handleSubmit } = useForm<IUserDto>({
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
      <SectionHeader title="Edit your account settings" />
      <Controller
        defaultValue={user.flags}
        control={control}
        name="flags"
        render={({ field: { onChange, value } }) =>
          (
            <Toggle
              label="Private mode"
              clickHandler={() => {
                if (value.includes(PRIVATE)) {
                  onChange(value.filter((flag) => flag !== PRIVATE));
                } else {
                  onChange([...value, PRIVATE]);
                }
              }}
              isEnabled={value.includes(PRIVATE)}
            />
          ) as any
        }
      />
      <Button type="submit" disabled={isLoading}>
        Save
      </Button>
    </form>
  );
};

export default SettingsUpdateForm;
