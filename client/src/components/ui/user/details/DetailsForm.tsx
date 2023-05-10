import { FC } from 'react';
import styles from './DetailsForm.module.scss';
import AvatarForm from './AvatarForm';
import PasswordForm from './PasswordForm';
import UsernameForm from './UsernameForm';

const DetailsUpdateForm: FC = () => (
  <div className={styles.detailsUpdateForm}>
    <AvatarForm />
    <UsernameForm />
    <PasswordForm />
  </div>
);

export default DetailsUpdateForm;
