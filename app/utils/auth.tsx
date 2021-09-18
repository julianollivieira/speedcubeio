import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  ReactElement,
} from 'react';
import {
  getAuth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  updateProfile,
  Unsubscribe,
} from 'firebase/auth';
import { getDatabase, ref, get, DataSnapshot } from 'firebase/database';
import app from '@/utils/firebase/client';
import { UserData } from '@/types/User';

const auth = getAuth(app);

const database = getDatabase(app);

interface Context {
  currentUser: User | null | undefined;
  currentUserData: UserData | null | undefined;
  signup: (
    displayName: string,
    email: string,
    password: string
  ) => Promise<void | UserCredential | undefined>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<Context>(undefined!);

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [currentUserData, setCurrentUserData] = useState<UserData | null>();

  useEffect(() => {
    const unsubscribe: Unsubscribe = auth.onAuthStateChanged(
      (user: User | null) => {
        setCurrentUser(user);
        if (user) {
          const reference = ref(database, `/users/${user?.uid}`);
          get(reference).then((snapshot: DataSnapshot) => {
            setCurrentUserData(snapshot.val());
          });
        }
      }
    );
    return unsubscribe;
  }, []);

  const signup = (
    displayName: string,
    email: string,
    password: string
  ): Promise<void | UserCredential | undefined> => {
    return createUserWithEmailAndPassword(auth, email, password).then(() => {
      if (auth.currentUser) {
        return updateProfile(auth.currentUser, {
          displayName: displayName,
        });
      }
    });
  };

  const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = (): Promise<void> => {
    return auth.signOut();
  };

  const value: Context = {
    currentUserData,
    currentUser,
    signup,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
