import { Box, Time } from '@/types';
import { getFirestore, updateDoc, getDoc, doc } from '@firebase/firestore';
import app from '@/utils/firebase/client';
import { User } from '@firebase/auth';
import dayjs from 'dayjs';

type Options = Pick<Time, 'time' | 'puzzle' | 'scramble' | 'comment'>;

const db = getFirestore(app);

const createTime = async (
  user: User,
  boxId: Box['id'],
  options: Options
): Promise<Time | null> => {
  const boxesCollectionRef = doc(db, 'users', user.uid, 'boxes', boxId);
  const boxSnapshot = await getDoc(boxesCollectionRef);
  const boxData = boxSnapshot.data() as Box | undefined;

  if (!boxData) return null;
  if (!boxData.times) boxData.times = [];

  const newTime = {
    id: (Math.floor(Math.random() * 100000000) + dayjs().valueOf()) as unknown as string,
    createdAt: dayjs().unix(),
    ...options,
  } as Time;

  boxData.times.push(newTime);

  await updateDoc(boxesCollectionRef, {
    times: boxData.times,
  });

  return newTime;
};

export default createTime;
