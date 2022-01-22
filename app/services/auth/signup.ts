import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  updateProfile,
  UserCredential,
  sendEmailVerification,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Profile } from '@/types';
import app from '@/utils/firebase/client';
import { getFirestore } from '@firebase/firestore';

interface signupOptions {
  displayName: string;
  email: string;
  password: string;
}

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (options: signupOptions): Promise<UserCredential> => {
  const { displayName, email, password } = options;
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  const { user } = userCredential;
  await updateProfile(user, { displayName });
  await sendEmailVerification(user);
  await signOut(auth);

  const profileReference = doc(db, 'users', user.uid);
  const profile: Profile = {
    isPrivate: false,
    isVerified: false,
    socialLinks: [],
  };

  await setDoc(profileReference, profile);

  return userCredential;
};

export default signup;
