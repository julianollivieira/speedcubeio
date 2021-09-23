import { doc, getDoc, getFirestore, updateDoc } from '@firebase/firestore';
import app from '@/utils/firebase/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Time } from '@/types';
dayjs.extend(utc);

const db = getFirestore(app);

const createTime = async (
  userId: string,
  boxId: string,
  time: number,
  puzzle: string,
  scramble: string
): Promise<Time> => {
  const boxReference = doc(db, 'users', userId, 'boxes', boxId);
  const boxDocument = await getDoc(boxReference);

  const times = boxDocument.data()?.times ?? [];

  const timeObject: Time = {
    id: dayjs().valueOf() as unknown as string,
    time: time,
    puzzle: puzzle,
    scramble: scramble,
    creationTime: dayjs().unix(),
  };

  times.push(timeObject);

  await updateDoc(boxReference, { times: times });

  return timeObject;
};

const deleteTime = async (
  userId: string,
  boxId: string,
  timeId: string
): Promise<void> => {
  const boxReference = doc(db, 'users', userId, 'boxes', boxId);
  const boxDocument = await getDoc(boxReference);

  const box = boxDocument.data();

  if (!box) return;

  const newTimeArr = box.times.filter((time: Time) => time.id !== timeId);

  updateDoc(boxReference, {
    times: newTimeArr,
  });
};

export { createTime, deleteTime };
