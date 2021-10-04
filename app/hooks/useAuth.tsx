import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Box, Time, User } from '@/types';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  Unsubscribe,
  updateProfile,
  User as FirebaseUser,
  UserCredential,
  sendEmailVerification,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from 'firebase/auth';
import app from '@/utils/firebase/client';
import { getUser } from '@/utils/data/users';

const auth = getAuth(app);

interface Context {
  user: User | null | undefined;
  signup: (
    displayName: string,
    email: string,
    password: string
  ) => Promise<UserCredential | void>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  addBox: (box: Box) => void;
  deleteBox: (box: Box) => void;
  editBox: (box: Box, name: string, icon: string, color: string) => void;
  addTime: (boxId: string, time: Time) => void;
  deleteTime: (boxId: string, timeId: string) => void;
}

const AuthContext = createContext<Context>(undefined!);

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>();
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>();

  useEffect(() => {
    const unsubscribe: Unsubscribe = auth.onAuthStateChanged(
      async (user: FirebaseUser | null) => {
        if (user) {
          if (user.emailVerified) {
            console.log('✅ You are logged in');
            setUser(await getUser(user));
            setFirebaseUser(user);
          } else {
            console.log('📧 Email not verified');
            auth.signOut();
            setUser(null);
            setFirebaseUser(null);
          }
        } else {
          console.log('🛑 You are not logged in');
          setUser(null);
          setFirebaseUser(null);
        }
      }
    );
    return unsubscribe;
  }, []);

  const signup = (
    displayName: string,
    email: string,
    password: string
  ): Promise<UserCredential | void> =>
    createUserWithEmailAndPassword(auth, email, password).then(() => {
      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: displayName,
        });
        sendEmailVerification(auth.currentUser);
      }
      auth.signOut();
    });

  const login = (email: string, password: string): Promise<UserCredential> =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = (): Promise<void> => auth.signOut();

  const changePassword = async (
    oldPassword: string,
    newPassword: string
  ): Promise<void> => {
    if (!firebaseUser?.email) throw new Error();
    const credential = EmailAuthProvider.credential(firebaseUser.email, oldPassword);
    await reauthenticateWithCredential(firebaseUser, credential);
    await updatePassword(firebaseUser, newPassword);
  };

  const addBox = (box: Box): void => {
    const newUser = { ...user } as User;
    newUser.boxes?.push(box);
    setUser(newUser);
  };

  const deleteBox = (box: Box): void => {
    const newUser = { ...user } as User;
    const boxToDelete = newUser.boxes?.find((existingBox) => existingBox.id === box.id);

    if (!boxToDelete) throw "Couldn't find box to delete in state";

    newUser.boxes?.splice(newUser.boxes?.indexOf(boxToDelete), 1);
    setUser(newUser);
  };

  const editBox = (box: Box, name: string, icon: string, color: string): void => {
    const newUser = { ...user } as User;
    const boxToEdit = newUser.boxes?.find((existingBox) => existingBox.id === box.id);

    if (!boxToEdit) throw "Couldn't find box to edit in state";

    const boxIndex = newUser.boxes?.indexOf(boxToEdit);
    boxToEdit.name = name;
    boxToEdit.icon = icon;
    boxToEdit.color = color;
    newUser.boxes[boxIndex] = boxToEdit;
    setUser(newUser);
  };

  const addTime = (boxId: string, time: Time): void => {
    const newUser = { ...user } as User;
    const boxToAddTimeTo = newUser.boxes?.find((existingBox) => existingBox.id === boxId);

    if (!boxToAddTimeTo) throw "Couldn't find box to add time to";
    const boxIndex = newUser.boxes?.indexOf(boxToAddTimeTo);

    boxToAddTimeTo.times.push({
      id: time.id,
      time: time.time,
      puzzle: time.puzzle,
      scramble: time.scramble,
      creationTime: time.creationTime,
    });
    newUser.boxes[boxIndex] = boxToAddTimeTo;

    setUser(newUser);
  };

  const deleteTime = (boxId: string, timeId: string): void => {
    const newUser = { ...user } as User;
    const boxToDeleteFrom = newUser.boxes?.find(
      (existingBox) => existingBox.id === boxId
    );

    if (!boxToDeleteFrom) throw "Couldn't find box to delete time from in state";

    const boxIndex = newUser.boxes?.indexOf(boxToDeleteFrom);
    const timeToDelete = boxToDeleteFrom.times.find(
      (existingTime) => existingTime.id === timeId
    );

    if (!timeToDelete) throw "Couldn't find time in state";

    const timeInBoxIndex = boxToDeleteFrom.times.indexOf(timeToDelete);
    boxToDeleteFrom.times.splice(timeInBoxIndex, 1);
    newUser.boxes[boxIndex] = boxToDeleteFrom;

    setUser(newUser);
  };

  const value: Context = {
    user,
    signup,
    login,
    logout,
    changePassword,
    addBox,
    deleteBox,
    editBox,
    addTime,
    deleteTime,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
