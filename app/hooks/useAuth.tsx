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
  addBox: (box: Box) => void;
  deleteBox: (box: Box) => void;
  editBox: (box: Box, name: string, icon: string, color: string) => void;
  addTime: (boxId: string, time: Time) => void;
}

const AuthContext = createContext<Context>(undefined!);

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe: Unsubscribe = auth.onAuthStateChanged(
      async (user: FirebaseUser | null) => {
        if (user) {
          console.log('✅ You are logged in');
          setUser(await getUser(user));
        } else {
          console.log('🛑 You are not logged in');
          setUser(null);
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
      }
    });

  const login = (email: string, password: string): Promise<UserCredential> =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = (): Promise<void> => auth.signOut();

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

  const value: Context = {
    user,
    signup,
    login,
    logout,
    addBox,
    deleteBox,
    editBox,
    addTime,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };