import { Box } from '@/types';
import { getFirestore, updateDoc, doc } from '@firebase/firestore';
import app from '@/utils/firebase/client';
import { User } from '@firebase/auth';
import dayjs from 'dayjs';

type Options = Pick<Box, 'name' | 'icon' | 'color'>;

const db = getFirestore(app);

const editBox = async (user: User, boxId: Box['id'], options: Options): Promise<Box> => {
  const boxDocumentRef = doc(db, 'users', user.uid, 'boxes', boxId);

  await updateDoc(boxDocumentRef, {
    ...options,
    createdAt: dayjs().unix(),
  });

  return {
    id: boxDocumentRef.id,
    ...options,
  } as Box;
};

export default editBox;
