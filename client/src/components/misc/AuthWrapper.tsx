import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { Children, ComponentAuthed } from '@types';
import useAuth from '@hooks/useAuth';

interface AuthWrapperProps extends ComponentAuthed {
  children: Children;
}

const AuthWrapper: FC<AuthWrapperProps> = ({
  auth,
  children,
}: AuthWrapperProps) => {
  const [authed, setAuthed] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    for (let i = 0; i < auth.length; i += 1) {
      if (!user || user.flags.indexOf(auth[i]) === -1) {
        router.replace('/');
        return;
      }
    }
    setAuthed(true);
  }, [auth, user, router]);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{authed && children}</>;
};

export default AuthWrapper;
