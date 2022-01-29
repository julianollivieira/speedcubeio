import { getFirestore, doc, updateDoc } from '@firebase/firestore';
import app from '@/utils/firebase/client';
import { User } from '@firebase/auth';

const db = getFirestore(app);

const setProfileVisibility = async (user: User, isPrivate: boolean): Promise<boolean> => {
  const profileDocumentRef = doc(db, 'users', user.uid);
  await updateDoc(profileDocumentRef, { isPrivate });
  return isPrivate;
};

export default setProfileVisibility;
