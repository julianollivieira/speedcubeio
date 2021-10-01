import Head from 'next/head';
import Router from 'next/router';
import { ReactNode, useEffect, ReactElement, useReducer } from 'react';
import { Box, CircularProgress } from '@mui/material';
import NavigationBar from '@/components/navigation/NavigationBar';
import NavigationDrawer from '@/components/navigation/NavigationDrawer';
import useLocalStorage from '@/hooks/useLocalStorage';
// import { useSelector, useDispatch } from 'react-redux';
import { getAuth, Unsubscribe, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { selectUser } from '@/store';
import { User, Box as BoxType } from '@/types';
import app from '@/utils/firebase/client';
import userReducer from '@/store/reducers/userReducer';
// import { setUser } from '@/features/userSlice';
// import { setBoxes } from '@/features/boxSlice';

const auth = getAuth(app);
// const db = getFirestore(app);

interface Props {
  title?: string;
  children: ReactNode;
  allowUnauthenticated?: boolean;
  isApp?: boolean;
}

const Layout = ({
  title,
  children,
  allowUnauthenticated,
  isApp,
}: Props): ReactElement => {
  // const user = useSelector(selectUser);
  // const dispatch = useDispatch();

  const [state, dispatch] = useReducer(userReducer, {
    user: undefined,
  });

  useEffect(() => {
    const unsubscribe: Unsubscribe = auth.onAuthStateChanged(
      async (firebaseUser: FirebaseUser | null) => {
        dispatch({
          type: 'SET_USER',
          payload: firebaseUser,
        });
      }
      // dispatch(setUser(firebaseUser?.toJSON() as User));

      // if (firebaseUser) {
      // const boxesSnapshot = await getDocs(
      //   collection(db, 'users', firebaseUser?.uid, 'boxes')
      // );
      // const boxes: BoxType[] = boxesSnapshot.docs.map(
      //   (boxDoc) =>
      //   ({
      //     id: boxDoc.id,
      //     ...boxDoc.data(),
      //   } as BoxType)
      // );
      // dispatch(setBoxes(boxes));
    );
    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   if (user === null && !allowUnauthenticated) {
  //     Router.push('/login');
  //   }
  // }, [user]);

  const [open, setOpen] = useLocalStorage('drawerOpen', false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const toggleNavigationDrawer = () => setOpen(!open);

  return user || (allowUnauthenticated && user !== undefined) ? (
    <>
      <Head>
        <title>{title ? `${title} | ` : ''}Speedcube.io</title>
      </Head>
      <NavigationBar isApp={isApp} toggleNavigationDrawer={toggleNavigationDrawer} />
      {user && isApp ? (
        <NavigationDrawer
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
      ) : (
        <></>
      )}
      <Box>{children}</Box>
    </>
  ) : (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Layout;
