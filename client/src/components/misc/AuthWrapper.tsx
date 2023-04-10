import { Children } from '@types';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '@hooks/useAppDispatch';

interface GenericLayoutProps {
  auth: string[];
  children: Children;
}

const AuthWrapper: FC<GenericLayoutProps> = ({
  auth,
  children,
}: GenericLayoutProps) => {
  const [authed, setAuthed] = useState<boolean>(false);
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    for (let i = 0; i < auth.length; i += 1) {
      if (!user || user.flags.indexOf(auth[i]) === -1) {
        router.replace('/');
        return;
      }
    }
    setAuthed(true);
  }, [user, router]);
  return (
    <>
      {authed && children}
    </>
  );
}

export default AuthWrapper;
