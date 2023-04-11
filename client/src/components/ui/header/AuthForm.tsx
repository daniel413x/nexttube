/* eslint-disable */

import useOutside from '@hooks/useOutside';
import { FC, useState } from 'react';
import styles from './AuthForm.module.scss'
import iconsStyles from './IconsRight.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAuthFields } from '@types';
import IconSpan from '../common/IconSpan';
import Button from '../common/Button';
import { FaUserCircle } from 'react-icons/fa';
import Input from '../common/Input';
import { VALID_EMAIL, VALID_PASSWORD } from '@data/consts';

const AuthForm: FC = () => {
  const {
    ref,
    setShow,
    show,
  } = useOutside(false);
  const [type, setType] = useState<'login' | 'register'>('login');
  const {register, formState: {errors}, handleSubmit} = useForm<IAuthFields>({
    mode: 'onChange',
  });
  const onSubmit: SubmitHandler<IAuthFields> = (data) => {
    if (type === 'login') {

    } else if (type === 'register') {

    }
  }
  return (
    <div className={styles['auth-form']} ref={ref}>
      <Button className={iconsStyles.button} onClick={() => setShow(!show)}>
        <IconSpan Icon={FaUserCircle} />
      </Button>
      {show && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('email', {
              required: 'Email required',
              pattern: {
                value: VALID_EMAIL,
                message: 'Invalid email format',
              }
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
              }
            })}
            placeholder="Password"
            error={errors.password}
            type="password"
          />
          <div className={styles['login-button']}>
            <Button onClick={() => setType('login')}>
              Login
            </Button>
          </div>
          <Button className={styles['register-button']} onClick={() => setType('register')}>
            Register
          </Button>
        </form>
      )}
    </div>
  );
}

export default AuthForm;
