import { ReactElement, ReactNode, useEffect } from 'react';
import { userAtom } from '@/store';
import { useAtom } from 'jotai';
import { User } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import app from '@/utils/firebase/client';

const auth = getAuth(app);

interface Props {
  children: ReactNode;
}

const Wrapper = ({ children }: Props): ReactElement => {
  const [, setUser] = useAtom(userAtom);

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

  return <>{children}</>;
};

export default Wrapper;
