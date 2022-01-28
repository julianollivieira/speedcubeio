import { getFirestore, doc, updateDoc } from '@firebase/firestore';
import app from '@/utils/firebase/client';
import { User } from '@firebase/auth';
import { Box } from '@/types';

const db = getFirestore(app);

const setBoxVisibility = async (
  user: User,
  boxId: Box['id'],
  isPrivate: boolean
): Promise<boolean> => {
  const boxDocumentRef = doc(db, 'users', user.uid, 'boxes', boxId);
  await updateDoc(boxDocumentRef, { isPrivate });
  return isPrivate;
};

export default setBoxVisibility;
