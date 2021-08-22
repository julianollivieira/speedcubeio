import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  ReactElement,
} from 'react';
import firebase from '@/utils/firebase';

const auth = firebase.app('client').auth();

interface Context {
  currentUser: firebase.User | null | undefined;
  signup: (
    displayName: string,
    email: string,
    password: string
  ) => Promise<void | firebase.auth.UserCredential | undefined>;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<Context>(undefined!);

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>();

  const signup = (
    displayName: string,
    email: string,
    password: string
  ): Promise<void | firebase.auth.UserCredential | undefined> => {
    return auth.createUserWithEmailAndPassword(email, password).then(() => {
      const user: firebase.User | null = firebase
        .app('client')
        .auth().currentUser; // ?
      return user?.updateProfile({
        displayName: displayName,
      });
    });
  };

  const login = (
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = (): Promise<void> => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe: firebase.Unsubscribe = auth.onAuthStateChanged(
      (user: firebase.User | null) => {
        setCurrentUser(user);
      }
    );

    return unsubscribe;
  }, []);

  const value: Context = { currentUser, signup, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
