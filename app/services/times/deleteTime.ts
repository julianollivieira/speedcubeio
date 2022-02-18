import { Box, Time } from '@/types';
import { getFirestore, updateDoc, doc, getDoc } from '@firebase/firestore';
import app from '@/utils/firebase/client';
import { User } from '@firebase/auth';

const db = getFirestore(app);

const deleteTime = async (
  user: User,
  boxId: Box['id'],
  timeId: Time['id']
): Promise<void> => {
  const boxDocumentRef = doc(db, 'users', user.uid, 'boxes', boxId);
  const boxSnapshot = await getDoc(boxDocumentRef);
  const boxData = boxSnapshot.data();

  const times = (boxData as Box)?.times.filter((time) => time.id !== timeId);

  await updateDoc(boxDocumentRef, {
    times,
  });
};

export default deleteTime;
