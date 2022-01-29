import { useEffect } from 'react';
import Router from 'next/router';
import { User } from 'firebase/auth';

const redirectIfUnauthenticated = (user: User | undefined, inverse: boolean) => {
  useEffect(() => {
    if (user === undefined && !inverse) Router.push('/login');
    if (user !== undefined && inverse) Router.push('/home');
  }, [user]);
};

export default redirectIfUnauthenticated;
