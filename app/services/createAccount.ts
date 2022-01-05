import { Profile } from '@/types';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from 'firebase/auth';
import { Firestore, doc, setDoc } from 'firebase/firestore';

interface Options {
  displayName: string;
  email: string;
  password: string;
}

const createAccount = async (
  auth: Auth,
  db: Firestore,
  options: Options
): Promise<{ profile: Profile; userCredential: UserCredential }> => {
  const { email, password, displayName } = options;
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  const { user } = userCredential;
  await updateProfile(user, { displayName });

  const profileReference = doc(db, 'users', user.uid);
  const profile: Profile = {
    isPrivate: false,
    isVerified: false,
    socialLinks: [],
  };

  await setDoc(profileReference, profile);

  return { profile, userCredential };
};

export default createAccount;
