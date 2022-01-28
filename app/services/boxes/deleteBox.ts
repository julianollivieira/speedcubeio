import { Box } from '@/types';
import { getFirestore, deleteDoc, doc } from '@firebase/firestore';
import app from '@/utils/firebase/client';
import { User } from '@firebase/auth';

const db = getFirestore(app);

const deleteBox = async (user: User, boxId: Box['id']): Promise<void> => {
  const boxDocumentRef = doc(db, 'users', user.uid, 'boxes', boxId);
  await deleteDoc(boxDocumentRef);
};

export default deleteBox;
