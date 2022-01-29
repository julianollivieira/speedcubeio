import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import app from '@/utils/firebase/client';

interface Options {
  email: string;
  password: string;
}

const auth = getAuth(app);

const login = async (options: Options): Promise<UserCredential> => {
  const { email, password } = options;

  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  if (!userCredential.user.emailVerified) {
    await signOut(auth);
  }

  return userCredential;
};

export default login;
