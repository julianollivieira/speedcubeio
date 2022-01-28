import { getFirestore, doc, getDoc } from '@firebase/firestore';
import app from '@/utils/firebase/client';
import { Profile } from '@/types';
import { User } from '@firebase/auth';

const db = getFirestore(app);

const getProfile = async (user: User): Promise<Profile | undefined> => {
  const profileDocumentRef = doc(db, 'users', user.uid);
  const profileSnapshot = await getDoc(profileDocumentRef);
  const profileData = profileSnapshot.data() as Profile | undefined;
  return profileData;
};

export default getProfile;
