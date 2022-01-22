import { ReactElement, ReactNode, useEffect } from 'react';
import { userAtom, profileAtom } from '@/store';
import { useAtom } from 'jotai';
import { User } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import app from '@/utils/firebase/client';
import getProfile from '@/services/profile/getProfile';

const auth = getAuth(app);

interface Props {
  children: ReactNode;
}

const Wrapper = ({ children }: Props): ReactElement => {
  const [user, setUser] = useAtom(userAtom);
  const [, setProfile] = useAtom(profileAtom);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: User | null) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user !== undefined) {
      getProfile(user).then((newProfile) => {
        setProfile(newProfile);
      });
    }
  }, [user]);

  return <>{children}</>;
};

export default Wrapper;
