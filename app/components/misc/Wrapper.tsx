import { ReactElement, ReactNode, useEffect } from 'react';
import {
  userAtom,
  profileAtom,
  boxesAtom,
  currentBoxIdAtom,
  scrambleAtom,
  scrambleHistoryAtom,
  currentPuzzleAtom,
} from '@/store';
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
  const [scramble] = useAtom(scrambleAtom);
  const [scrambleHistory, setScrambleHistory] = useAtom(scrambleHistoryAtom);
  const [currentPuzzle] = useAtom(currentPuzzleAtom);
  const [, setProfile] = useAtom(profileAtom);
  const [, setBoxes] = useAtom(boxesAtom);
  const [, setCurrentBoxId] = useAtom(currentBoxIdAtom);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: User | null) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user == undefined || user == null) return;
    getProfile(user).then((newProfile) => {
      setProfile(newProfile);
    });
    getBoxes(user).then((newBoxes) => {
      setBoxes(newBoxes);
      if (newBoxes.length > 0) {
        setCurrentBoxId(newBoxes[0].id);
      }
    });
  }, [user]);

  useEffect(() => {
    if (!scramble || !currentPuzzle) return;
    setScrambleHistory([
      ...scrambleHistory,
      {
        scramble,
        puzzle: currentPuzzle,
      },
    ]);
  }, [scramble]);

  return <>{children}</>;
};

export default Wrapper;
