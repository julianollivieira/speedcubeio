import { FullUser } from '@/types/User';
import { useEffect, useState } from 'react';
import {
  convertUserToFullUser,
  convertUserRecordToFullUser,
} from '@/utils/user';

const useUser = (user: any) => {
  const [fullUser, setFullUser] = useState<FullUser | null | undefined>(null);
  useEffect(() => {
    if (!fullUser) {
      if (user) {
        if (user.user) {
          if (!user?.user?.hasOwnProperty('accessToken')) {
            setFullUser(convertUserRecordToFullUser(user.user, user.data));
          } else {
            setFullUser(convertUserToFullUser(user.user, user.data));
          }
        }
      }
    }
  }, [user]);

  return { fullUser };
};

export default useUser;
