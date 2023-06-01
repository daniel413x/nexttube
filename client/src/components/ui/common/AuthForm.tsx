import { VALID_EMAIL, VALID_PASSWORD, VALID_USERNAME } from '@data/consts';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaUserCircle } from 'react-icons/fa';
import { IAuthFields, SCSSModule } from '@types';
import useActions from '@hooks/useActions';
import useAuth from '@hooks/useAuth';
import useHideOnOutsideClick from '@hooks/useHideOnOutsideClick';
import { cobbleStyles } from '@utils';
import defaultStyles from './AuthForm.module.scss';
import Button from './Button';
import IconSpan from './IconSpan';
import Input from './Input';

interface AuthFormProps {
  staticPosition?: boolean;
  parentStyles?: SCSSModule;
}

const AuthForm: FC<AuthFormProps> = ({ staticPosition, parentStyles }) => {
  const styles = cobbleStyles(defaultStyles, parentStyles);
  const [forLogin, setForLogin] = useState<boolean>(true);
  const { ref, setShow, show } = useHideOnOutsideClick(false);
  const { loading } = useAuth();
  const { register, login } = useActions();
  const {
    register: registerProps,
    formState: { errors },
    handleSubmit,
  } = useForm<IAuthFields>({
    mode: 'onChange',
  });
  const onSubmit: SubmitHandler<IAuthFields> = async (data) => {
    if (forLogin) {
      login(data);
    } else {
      register(data);
    }
  };
  const [place, setPlace] = useState<boolean>(false);
  useEffect(() => {
    setPlace(true);
  }, []);
  return (
    <div
      className={cn(styles.authForm, {
        [styles.place]: place,
        [styles.staticPosition]: staticPosition,
      })}
      ref={ref}
    >
      {!staticPosition && (
        <button
          className={styles.button}
          onClick={() => setShow(!show)}
          type="button"
        >
          <IconSpan Icon={FaUserCircle} />
        </button>
      )}

      {(show || staticPosition) && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {!forLogin && (
            <Input
              {...registerProps('email', {
                required: 'Email required',
                pattern: {
                  value: VALID_EMAIL,
                  message: 'Invalid email format',
                },
              })}
              placeholder="Email address"
              error={errors.email}
            />
          )}
          <Input
            {...registerProps('username', {
              required: 'Username required',
              pattern: {
                value: VALID_USERNAME,
                message: 'Invalid (3-25 alphanumeric characters)',
              },
            })}
            placeholder="Username (3-25 alphanumeric characters)"
            error={errors.username}
          />
          <Input
            {...registerProps('password', {
              required: 'Password required',
              pattern: {
                value: VALID_PASSWORD,
                message: 'Invalid (6-35 characters)',
              },
            })}
            placeholder="Password (6-35 characters)"
            error={errors.password}
            type="password"
          />
          <Button
            className={styles.loginButton}
            type="submit"
            loading={loading}
          >
            {forLogin ? 'Login' : 'Register'}
          </Button>
          <button
            className={styles.registerButton}
            onClick={() => setForLogin(!forLogin)}
            disabled={loading}
            type="button"
          >
            {forLogin ? 'Register' : 'Login'}
          </button>
        </form>
      )}
    </div>
  );
};

AuthForm.defaultProps = {
  staticPosition: false,
  parentStyles: undefined,
};

export default AuthForm;
