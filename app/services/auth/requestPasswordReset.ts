import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from '@/utils/firebase/client';

interface RequestPasswordResetOptions {
  email: string;
}

const auth = getAuth(app);

const requestPasswordReset = async (
  options: RequestPasswordResetOptions
): Promise<void> => {
  await sendPasswordResetEmail(auth, options.email);
};

export default requestPasswordReset;
