import { FC } from 'react';
import useUser from '@hooks/useUser';
import AuthForm from './AuthForm';
import styles from './IconsRight.module.scss';
import ProfileMenu from './ProfileMenu';
import UploadVideoButton from './upload-video/UploadVideoButton';

const IconsRight: FC = () => {
  const user = useUser();
  return (
    <div className={styles.iconsRight}>
      {user?.id ? (
        <>
          <ProfileMenu />
          <UploadVideoButton />
        </>
      ) : (
        <AuthForm />
      )}
    </div>
  );
};

export default IconsRight;
