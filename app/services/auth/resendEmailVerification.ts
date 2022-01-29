import {
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import app from '@/utils/firebase/client';

interface Options {
  email: string;
  password: string;
}

const auth = getAuth(app);

const resendEmailVerification = async (options: Options): Promise<void> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    options.email,
    options.password
  );
  if (!userCredential.user.emailVerified) {
    await sendEmailVerification(userCredential.user);
    signOut(auth);
  } else {
    throw { code: 'auth/email-already-verified' };
  }
};

export default resendEmailVerification;
