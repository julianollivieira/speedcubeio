import { Box } from '@/types';
import { User } from 'firebase/auth';
import { Firestore, doc, updateDoc } from 'firebase/firestore';

const setBoxVisibility = async (
  db: Firestore,
  user: User,
  box: Box,
  isPrivate: boolean
) => {
  const boxReference = doc(db, 'users', user.uid, 'boxes', box.id);
  await updateDoc(boxReference, { isPrivate });
  return isPrivate;
};

export default setBoxVisibility;
