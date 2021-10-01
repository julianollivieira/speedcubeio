import { createContext, ReactElement, ReactNode, useContext, useState } from 'react';
import { useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
  User,
  UserCredential,
} from 'firebase/auth';
import app from '@/utils/firebase/client';

type Context = {
  user: User | undefined | null;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  signUp: (
    displayName: string,
    email: string,
    password: string
  ) => Promise<UserCredential>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
};

const auth = getAuth(app);

const UserContext = createContext<Context>({
  user: undefined,
  logIn: undefined,
  logOut: undefined,
  signUp: undefined,
  changePassword: undefined,
}); // TODO: fix

const useUser = (): Context => useContext(UserContext);

const UserProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [user, setUser] = useState<User | undefined | null>(undefined);

  // Set user on page load
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  // Log the user in
  const logIn = async (email: string, password: string): Promise<UserCredential> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  };

  // Log the user out
  const logOut = async (): Promise<void> => {
    await signOut(auth);
  };

  // Sign the user up for an account
  const signUp = async (
    displayName: string,
    email: string,
    password: string
  ): Promise<UserCredential> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: displayName });
    await sendEmailVerification(userCredential.user);
    signOut(auth);
    return userCredential;
  };

  // Reauthenticate the user and change the user's password
  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ): Promise<void> => {
    if (!user?.email) throw new Error();
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  };

  const value: Context = { user, logIn, logOut, signUp, changePassword };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider, useUser };
