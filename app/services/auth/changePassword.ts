import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  User,
} from 'firebase/auth';

interface Options {
  currentPassword: string;
  newPassword: string;
}

const changePassword = async (user: User, options: Options): Promise<void> => {
  if (!user?.email) return;
  const credential = EmailAuthProvider.credential(user.email, options.currentPassword);
  await reauthenticateWithCredential(user, credential);
  await updatePassword(user, options.newPassword);
};

export default changePassword;
