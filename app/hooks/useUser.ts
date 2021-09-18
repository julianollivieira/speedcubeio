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
            convertUserRecordToFullUser(user.user, user.data).then(
              (fullUser) => {
                setFullUser(fullUser);
              }
            );
          } else {
            convertUserToFullUser(user.user, user.data).then((fullUser) => {
              setFullUser(fullUser);
            });
          }
        }
      }
    }
  }, [user]);

  return { fullUser };
};

export default useUser;
