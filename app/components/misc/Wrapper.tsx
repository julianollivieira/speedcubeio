import { ReactElement, ReactNode, useEffect } from 'react';
import { userAtom, profileAtom, boxesAtom } from '@/store';
import { useAtom } from 'jotai';
import { User } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import app from '@/utils/firebase/client';
import getProfile from '@/services/profile/getProfile';
import getBoxes from '@/services/boxes/getBoxes';

const auth = getAuth(app);

interface Props {
  children: ReactNode;
}

const Wrapper = ({ children }: Props): ReactElement => {
  const [user, setUser] = useAtom(userAtom);
  const [, setProfile] = useAtom(profileAtom);
  const [boxes, setBoxes] = useAtom(boxesAtom);

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
      getBoxes(user).then((newBoxes) => {
        setBoxes(newBoxes);
      });
    }
  }, [user]);

  return <>{children}</>;
};

export default Wrapper;
