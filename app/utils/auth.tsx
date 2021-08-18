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

const AuthContext = createContext({
  currentUser: {},
  signup: (displayName: string, email: string, password: string) => {},
  login: (email: string, password: string) => {},
  logout: () => {},
});

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [currentUser, setCurrentUser] = useState<any>();

  const signup = (displayName: string, email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password).then((res) => {
      const user = firebase.app('client').auth().currentUser; // ?
      return user?.updateProfile({
        displayName: displayName,
      });
    });
  };

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, signup, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
