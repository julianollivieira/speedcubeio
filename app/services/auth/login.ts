import { getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import app from '@/utils/firebase/client';

interface loginOptions {
  email: string;
  password: string;
}

const auth = getAuth(app);

const login = async (options: loginOptions): Promise<UserCredential> => {
  const { email, password } = options;
  return signInWithEmailAndPassword(auth, email, password);
};

export default login;
