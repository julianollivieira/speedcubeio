import { User } from '@/types';
import admin from '@/utils/firebase/admin';
import { User as FirebaseUser } from 'firebase/auth';
import { getUser } from '@/utils/data/users';
import { useEffect, useState } from 'react';

const useUser = (userObj: FirebaseUser | admin.auth.UserRecord) => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    if (userObj) {
      getUser(userObj).then((user) => {
        setUser(user);
      });
    }
  }, [userObj]);

  return user;
};

export default useUser;
