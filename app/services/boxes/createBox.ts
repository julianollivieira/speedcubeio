import { Box } from '@/types';
import { getFirestore, addDoc, collection, DocumentReference } from '@firebase/firestore';
import app from '@/utils/firebase/client';
import { User } from '@firebase/auth';
import dayjs from 'dayjs';

type Options = Pick<Box, 'name' | 'icon' | 'color'>;

const db = getFirestore(app);

const createBox = async (user: User, options: Options): Promise<DocumentReference> => {
  const newBoxCollection = collection(db, 'users', user.uid, 'boxes');
  const newBoxReference = await addDoc(newBoxCollection, {
    ...options,
    createdAt: dayjs().unix(),
  });
  return newBoxReference;
};

export default createBox;
