import { FC } from 'react';
import useUser from '@hooks/useUser';
import AuthForm from './AuthForm';
import styles from './IconsRight.module.scss';
import ProfileMenu from './ProfileMenu';
import UploadVideo from './UploadVideo';

const IconsRight: FC = () => {
  const user = useUser();
  return (
    <div className={styles['icons-right']}>
      {user.id ? (
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
