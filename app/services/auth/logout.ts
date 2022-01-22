import { getAuth, signOut } from 'firebase/auth';
import app from '@/utils/firebase/client';

const auth = getAuth(app);

const logout = async (): Promise<void> => {
  await signOut(auth);
};

export default logout;
