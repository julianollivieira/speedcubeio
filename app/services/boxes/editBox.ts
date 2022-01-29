import { Box } from '@/types';
import { getFirestore, updateDoc, getDoc, doc } from '@firebase/firestore';
import app from '@/utils/firebase/client';
import { User } from '@firebase/auth';

type Options = Pick<Box, 'name' | 'icon' | 'color'>;

const db = getFirestore(app);

const editBox = async (user: User, boxId: Box['id'], options: Options): Promise<Box> => {
  const boxDocumentRef = doc(db, 'users', user.uid, 'boxes', boxId);
  const boxSnapshot = await getDoc(boxDocumentRef);
  const boxData = boxSnapshot.data();

  await updateDoc(boxDocumentRef, {
    ...options,
  });

  return {
    id: boxDocumentRef.id,
    createdAt: boxData?.createdAt,
    times: boxData?.times,
    isPrivate: boxData?.isPrivate,
    ...options,
  } as Box;
};

export default editBox;
