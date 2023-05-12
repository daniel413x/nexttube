import cn from 'classnames';
import Image from 'next/image';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import UploadField from '@components/ui/common/UploadField';
import { IMediaResponse, IUserDto } from '@types';
import useUser from '@hooks/useUser';
import userApi from '@store/api/user';
import { createUserDto, toastSuccess } from '@utils';
import defaultAvatar from '@public/images/default-avatar.png';
import Button from '../../common/Button';
import SectionHeader from '../../common/SectionHeader';
import styles from './AvatarForm.module.scss';

const PersonalizeUpdateForm: FC = () => {
  const user = useUser();
  const { control, handleSubmit, watch } = useForm<IUserDto>({
    mode: 'onChange',
  });
  const thumbnailPath = watch('avatarPath') || user.avatarPath || defaultAvatar;
  const [updateUser, { isLoading }] = userApi.useUpdateUserMutation();
  const onSubmit: SubmitHandler<IUserDto> = (data) => {
    updateUser({ ...createUserDto(user), ...data })
      .unwrap()
      .then(() => {
        toastSuccess('Information updated!', 'Success');
      });
  };
  return (
    <form
      className={cn(styles.userPage, styles.personalizeUpdateForm)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SectionHeader title="Select an avatar" />
      <div className={styles.fieldCol}>
        <span className={styles.info}>Optimal: 75x75, 150x150</span>
        <Image
          src={thumbnailPath}
          width={75}
          height={75}
          alt="Your video thumbnail preview"
        />
        <Controller
          control={control}
          name="avatarPath"
          render={({ field: { onChange } }) => (
            <UploadField
              parentStyles={styles}
              folder="avatars"
              onChange={(value: IMediaResponse) => {
                onChange(value.url);
              }}
            />
          )}
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        Save
      </Button>
    </form>
  );
};

export default PersonalizeUpdateForm;
