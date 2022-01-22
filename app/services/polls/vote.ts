import app from '@/utils/firebase/client';
import { getFirestore } from 'firebase/firestore';

const db = getFirestore(app);

const vote = async (): Promise<void> => {
  //
};

export default vote;
