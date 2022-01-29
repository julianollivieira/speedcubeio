import { useEffect } from 'react';
import Router from 'next/router';
import { User } from 'firebase/auth';

const redirectIfUnauthenticated = (
  user: User | undefined | null,
  inverse: boolean
): void => {
  useEffect(() => {
    if (user === null && !inverse) Router.push('/login');
    if (user !== null && user?.emailVerified && inverse) Router.push('/home');
  }, [user]);
};

export default redirectIfUnauthenticated;
