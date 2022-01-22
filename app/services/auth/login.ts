import { getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import app from '@/utils/firebase/client';

interface Options {
  email: string;
  password: string;
}

const auth = getAuth(app);

const login = async (options: Options): Promise<UserCredential> => {
  const { email, password } = options;
  return signInWithEmailAndPassword(auth, email, password);
};

export default login;
