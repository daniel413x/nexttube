import { VALID_EMAIL, VALID_PASSWORD } from '@data/consts';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaUserCircle } from 'react-icons/fa';
import { IAuthFields } from '@types';
import useActions from '@hooks/useActions';
import useAuth from '@hooks/useAuth';
import useOutside from '@hooks/useOutside';
import Button from '../common/Button';
import IconSpan from '../common/IconSpan';
import Input from '../common/Input';
import styles from './AuthForm.module.scss';
import iconsStyles from './IconsRight.module.scss';

const AuthForm: FC = () => {
  const [forLogin, setForLogin] = useState<boolean>(true);
  const { ref, setShow, show } = useOutside(false);
  const { loading } = useAuth();
  const {
    register: dispatchRegister,
    login: dispatchLogin,
    logout,
  } = useActions();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IAuthFields>({
    mode: 'onChange',
  });
  const onSubmit: SubmitHandler<IAuthFields> = (data) => {
    if (forLogin) {
      dispatchLogin(data);
    } else {
      dispatchRegister(data);
    }
  };
  return (
    <div className={styles['auth-form']} ref={ref}>
      <button
        className={iconsStyles.button}
        onClick={() => setShow(!show)}
        type="button"
      >
        <IconSpan Icon={FaUserCircle} />
      </button>
      {show && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('email', {
              required: 'Email required',
              pattern: {
                value: VALID_EMAIL,
                message: 'Invalid email format',
              },
            })}
            placeholder="E-mail"
            error={errors.email}
          />
          <Input
            {...register('password', {
              required: 'Password required',
              pattern: {
                value: VALID_PASSWORD,
                message: 'Invalid password (6-35 characters)',
              },
            })}
            placeholder="Password"
            error={errors.password}
            type="password"
          />
          <Button
            className={styles['login-button']}
            type="submit"
            disabled={loading}
          >
            {forLogin ? 'Login' : 'Register'}
          </Button>
          <button
            className={styles['register-button']}
            onClick={() => setForLogin(!forLogin)}
            disabled={loading}
            type="button"
          >
            {forLogin ? 'Register' : 'Login'}
          </button>
          <button
            className={styles['register-button']}
            onClick={logout}
            type="button"
          >
            asdf
          </button>
        </form>
      )}
    </div>
  );
};

export default AuthForm;
