import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from '@/utils/firebase/client';

interface Options {
  email: string;
}

const auth = getAuth(app);

const requestPasswordReset = async (options: Options): Promise<void> => {
  await sendPasswordResetEmail(auth, options.email);
};

export default requestPasswordReset;
