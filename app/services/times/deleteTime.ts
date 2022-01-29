import { Box, Time } from '@/types';
import { getFirestore, deleteDoc, doc } from '@firebase/firestore';
import app from '@/utils/firebase/client';
import { User } from '@firebase/auth';

const db = getFirestore(app);

const deleteTime = async (
  user: User,
  boxId: Box['id'],
  timeId: Time['id']
): Promise<void> => {
  const timeDocumentRef = doc(db, 'users', user.uid, 'boxes', boxId, 'times', timeId);
  await deleteDoc(timeDocumentRef);
};

export default deleteTime;
