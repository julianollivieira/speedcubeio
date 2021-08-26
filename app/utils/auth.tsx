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
import app from '@/utils/firebase/client';

const auth = getAuth(app);

interface Context {
  currentUser: User | null | undefined;
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

  useEffect(() => {
    const unsubscribe: Unsubscribe = auth.onAuthStateChanged(
      (user: User | null) => {
        setCurrentUser(user);
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

  const value: Context = { currentUser, signup, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
