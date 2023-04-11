import { FC } from 'react';
import useAuth from '@hooks/useAuth';
import AuthForm from './AuthForm';
import styles from './IconsRight.module.scss';
import ProfileMenu from './ProfileMenu';
import UploadVideo from './UploadVideo';

const IconsRight: FC = () => {
  const { user } = useAuth();
  return (
    <div className={styles['icons-right']}>
      {user ? (
        <>
          <ProfileMenu />
          <UploadVideo />
        </>
      ) : (
        <AuthForm />
      )}
    </div>
  );
};

export default IconsRight;
