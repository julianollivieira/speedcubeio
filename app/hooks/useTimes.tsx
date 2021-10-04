import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
} from '@firebase/firestore';
import app from '@/utils/firebase/client';
import { Box, Time } from '@/types';
import { useUser } from '@/hooks/useUser';
import { useBoxes } from '@/hooks/useBoxes';

type Context = {
  times: Time[];
  createTime: () => Promise<void>;
  deleteTime: () => Promise<void>;
  editTime: () => Promise<void>;
};

const db = getFirestore(app);

const TimeContext = createContext<Context>({
  times: [],
  createTime: undefined,
  deleteTime: undefined,
  editTime: undefined,
}); // TODO: fix

const useTimes = (): Context => useContext(TimeContext);

const TimeProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [times, setTimes] = useState<Time[]>([]);
  const [boxId, setBoxId] = useState<Box>();
  const { boxes, setBox } = useBoxes();
  const { user } = useUser();

  // Set times on box load
  useEffect(() => {
    if (user && boxId) {
    }
  }, [user, boxId]);

  // Change box
  const changeBox = (): void => {
    //
  };

  // Create a time
  const createTime = async (): Promise<void> => {
    //
  };

  // Delete a time
  const deleteTime = async (): Promise<void> => {
    //
  };

  // Edit a time
  const editTime = async (): Promise<void> => {
    //
  };

  const value: Context = { times, createTime, deleteTime, editTime };
  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
};

export { TimeProvider, useTimes };
