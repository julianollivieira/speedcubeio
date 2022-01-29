import { Box } from '@/types';
import { getFirestore, addDoc, collection } from '@firebase/firestore';
import app from '@/utils/firebase/client';
import { User } from '@firebase/auth';
import dayjs from 'dayjs';

type Options = Pick<Box, 'name' | 'icon' | 'color'>;

const db = getFirestore(app);

const createBox = async (user: User, options: Options): Promise<Box> => {
  const boxesCollectionRef = collection(db, 'users', user.uid, 'boxes');
  const createdAt = dayjs().unix();

  const newBoxDocumentRef = await addDoc(boxesCollectionRef, {
    ...options,
    createdAt,
  });

  return {
    id: newBoxDocumentRef.id,
    createdAt,
    ...options,
  } as Box;
};

export default createBox;
