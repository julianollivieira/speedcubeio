import { getFirestore, collection, getDocs } from '@firebase/firestore';
import app from '@/utils/firebase/client';
import { Poll } from '@/types';

const db = getFirestore(app);

const getPolls = async () => {
  const pollsCollection = collection(db, 'polls');
  const pollsSnapshot = await getDocs(pollsCollection);
  const pollObjects = pollsSnapshot.docs.map(
    (pollDoc) =>
      ({
        id: pollDoc.id,
        ...pollDoc.data(),
      } as Poll)
  );
  const sortedPolls = pollObjects.sort((a, b) => b.publishedOn - a.publishedOn);
  return sortedPolls;
};

export default getPolls;
