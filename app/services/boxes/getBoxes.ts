import { getFirestore, collection, getDocs } from '@firebase/firestore';
import app from '@/utils/firebase/client';
import { Box } from '@/types';
import { User } from '@firebase/auth';

const db = getFirestore(app);

const getBoxes = async (user: User): Promise<Box[]> => {
  const boxesCollectionRef = collection(db, 'users', user?.uid, 'boxes');
  const boxesSnapshot = await getDocs(boxesCollectionRef);
  const boxObjects = boxesSnapshot.docs.map(
    (box) =>
      ({
        id: box.id,
        ...box.data(),
      } as Box)
  );

  return boxObjects;
};

export default getBoxes;
