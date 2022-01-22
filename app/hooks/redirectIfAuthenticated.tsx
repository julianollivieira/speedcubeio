import { useEffect } from 'react';
import Router from 'next/router';
import { User } from 'firebase/auth';

const redirectIfAuthenticated = (user: User | undefined) => {
  useEffect(() => {
    if (user !== undefined) {
      Router.push('/home');
    }
  }, [user]);
};

export default redirectIfAuthenticated;
