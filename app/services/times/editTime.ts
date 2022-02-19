import { Box, Time } from '@/types';
import { getFirestore, updateDoc, getDoc, doc } from '@firebase/firestore';
import app from '@/utils/firebase/client';
import { User } from '@firebase/auth';

type Options = Pick<Time, 'time' | 'scramble' | 'comment'>;

const db = getFirestore(app);

const editTime = async (
  user: User,
  boxId: Box['id'],
  timeId: Time['id'],
  options: Options
): Promise<Time | null> => {
  const boxDocumentRef = doc(db, 'users', user.uid, 'boxes', boxId);
  const boxSnapshot = await getDoc(boxDocumentRef);
  const boxData = boxSnapshot.data();

  let updatedTime: Time | null = null;

  const times = (boxData as Box)?.times.map((time) => {
    if (time.id === timeId) {
      updatedTime = {
        ...time,
        time: options.time,
        scramble: options.scramble,
        comment: options.comment ? options.comment : '',
      } as Time;
      return updatedTime;
    }

    return time;
  });

  await updateDoc(boxDocumentRef, {
    times,
  });

  return updatedTime;
};

export default editTime;
