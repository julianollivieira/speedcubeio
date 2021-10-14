import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
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
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  getDoc,
} from '@firebase/firestore';
import app from '@/utils/firebase/client';
import type { Box, Time, Profile, SocialLink, SocialLinkId, Puzzle } from '@/types';
import useLocalStorage from '@/hooks/useLocalStorage';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

interface Context {
  user: User | null | undefined;
  boxes: Box[];
  box: Box | undefined;
  profile: Profile | undefined;
  timerActive: boolean;
  currentPuzzle: Puzzle;

  logIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  signUp: (
    displayName: string,
    email: string,
    password: string
  ) => Promise<UserCredential>;

  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  changeProfilePicture: (newProfilePicture: Blob) => Promise<void>;
  removeProfilePicture: () => Promise<void>;
  createBox: (boxData: Pick<Box, 'name' | 'icon' | 'color'>) => Promise<void>;
  deleteBox: (boxId: string) => Promise<void>;
  editBox: (
    boxId: string,
    boxData: Pick<Box, 'name' | 'icon' | 'color'>
  ) => Promise<void>;

  changeBox: (boxId: string) => void;
  createTime: (
    timeData: Pick<Time, 'time' | 'puzzle' | 'scramble' | 'comment'>
  ) => Promise<void>;
  deleteTime: (timeId: string) => Promise<void>;
  editTime: (
    timeId: string,
    timeData: Pick<Time, 'time' | 'puzzle' | 'scramble' | 'comment'>
  ) => Promise<void>;

  addSocialLink: (id: SocialLinkId, href: string) => void;
  editSocialLink: (id: SocialLinkId, href: string) => void;
  removeSocialLink: (id: SocialLinkId) => void;
  setProfilePrivate: (isPrivate: boolean) => Promise<boolean>;
  setBoxPrivate: (isPrivate: boolean) => Promise<boolean>;

  setTimerActive: (state: boolean) => void;
  changePuzzle: (puzzle: Puzzle) => void;
}

const DataContext = createContext<Context>({} as Context);

const useData = () => useContext(DataContext);

const DataProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Context['user']>(undefined);
  const [boxes, setBoxes] = useState<Context['boxes']>([]);
  const [box, setBox] = useState<Context['box']>(undefined);
  const [profile, setProfile] = useState<Context['profile']>(undefined);
  const [currentBoxId, setCurrentBoxId] = useLocalStorage('currentBoxId', null);
  const [currentPuzzle, setCurrentPuzzle] = useLocalStorage('currentPuzzle', null);
  const [timerActive, setTimerState] = useState<Context['timerActive']>(false);

  // Set user on page load
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        console.log('🌆', user.photoURL);
        if (!user.photoURL) {
          user.photoURL = '/images/default_user_profile.jpg';
        }
        if (user.emailVerified) {
          console.log('✅ You are logged in');
          setUser(user);
        } else {
          console.log('📧 Email not verified');
          auth.signOut();
          setUser(null);
        }
      } else {
        console.log('🛑 You are not logged in');
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  // Set boxes on user load/change
  useEffect(() => {
    if (!user) return;
    getDocs(collection(db, 'users', user?.uid, 'boxes')).then((boxesSnapshot) => {
      const boxObjects: Box[] = boxesSnapshot.docs.map((boxDoc) => {
        return {
          id: boxDoc.id,
          ...boxDoc.data(),
        } as Box;
      });
      setBoxes(boxObjects);
      console.log(
        `📦🔢 Read ${boxObjects.length} box${boxObjects.length === 1 ? '' : 'es'}`
      );
    });
  }, [user]);

  // Update boxes on box change
  useEffect(() => {
    if (!box) return;
    setBoxes((prevState) => {
      return prevState.map((bx) => (bx.id === box.id ? box : bx));
    });
  }, [box]);

  // Retrieve current box from localstorage or set first
  useEffect(() => {
    if (currentBoxId) {
      const newCurrentBox = boxes.find((box) => box.id === currentBoxId);
      setBox(newCurrentBox ? newCurrentBox : boxes[0]);
    } else {
      setBox(boxes[0]);
    }
  }, [currentBoxId, boxes]);

  // Set profile on user load
  useEffect(() => {
    if (!user) return;
    const profileReference = doc(db, 'users', user.uid);
    getDoc(profileReference).then((profileSnapshot) => {
      const profileData = profileSnapshot.data() as Profile | undefined;
      if (!profileData) return;
      console.log('👤🔢 Read 1 profile');
      setProfile(profileData);
    });
  }, [user]);

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

  // Change the user's profile picture
  const changeProfilePicture = async (newProfilePicture: Blob) => {
    if (!user) return;
    const userProfilePictureRef = ref(storage, `users/${user.uid}/profile.png`);
    await uploadBytes(userProfilePictureRef, newProfilePicture).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(snapshot.ref);
      await updateProfile(user, { photoURL: downloadURL });
      setUser(
        (prevState) =>
        ({
          ...prevState,
          photoURL: downloadURL,
        } as User)
      );
    });
  };

  // Remove the user's profile picture
  const removeProfilePicture = async () => {
    if (!user) return;
    const userProfilePictureRef = ref(storage, `users/${user.uid}/profile.png`);
    await deleteObject(userProfilePictureRef);
    await updateProfile(user, { photoURL: null });
    setUser(
      (prevState) =>
      ({
        ...prevState,
        photoURL: '/images/default_user_profile.jpg',
      } as User)
    );
  };

  // Create a box
  const createBox = async (
    boxData: Pick<Box, 'name' | 'icon' | 'color'>
  ): Promise<void> => {
    if (!user) return;
    const createdAt = dayjs().unix();
    const newBoxRef = await addDoc(collection(db, 'users', user.uid, 'boxes'), {
      ...boxData,
      createdAt: createdAt,
    });
    setBoxes((prevState) => [
      ...prevState,
      {
        id: newBoxRef.id,
        createdAt: createdAt,
        ...boxData,
      } as Box,
    ]);
  };

  // Delete a box
  const deleteBox = async (boxId: string): Promise<void> => {
    if (!user) return;
    const boxRef = doc(db, 'users', user.uid, 'boxes', boxId);
    await deleteDoc(boxRef);
    setBoxes((prevState) => prevState.filter((box) => box.id !== boxId));
  };

  // Edit a box
  const editBox = async (
    boxId: string,
    boxData: Pick<Box, 'name' | 'icon' | 'color'>
  ): Promise<void> => {
    if (!user) return;
    const boxRef = doc(db, 'users', user.uid, 'boxes', boxId);
    await updateDoc(boxRef, boxData);
    setBoxes((prevState) =>
      prevState.map((box) =>
        box.id === boxId ? ({ id: boxId, ...boxData } as Box) : box
      )
    );
  };

  // Change current box
  const changeBox = (boxId: string): void => {
    const box = boxes.find((box) => box.id === boxId);
    setCurrentBoxId(boxId);
    setBox(box);
  };

  // Create a time
  const createTime = async (
    timeData: Pick<Time, 'time' | 'puzzle' | 'scramble' | 'comment'>
  ): Promise<void> => {
    if (!box || !user) return;
    const boxReference = doc(db, 'users', user.uid, 'boxes', box.id);
    const boxSnapshot = await getDoc(boxReference);
    const boxData = boxSnapshot.data() as Box | undefined;

    if (!boxData) return;
    if (!boxData.times) boxData.times = [];

    boxData.times.push({
      id: dayjs().valueOf() as unknown as string,
      createdAt: dayjs().unix(),
      ...timeData,
    } as Time);

    await updateDoc(boxReference, {
      times: boxData.times,
    });

    setBox(
      (prevState) =>
      ({
        ...prevState,
        times: boxData.times,
      } as Box)
    );
  };

  // Delete a time
  const deleteTime = async (timeId: string): Promise<void> => {
    if (!box || !user) return;
    const boxReference = doc(db, 'users', user.uid, 'boxes', box.id);
    const boxSnapshot = await getDoc(boxReference);
    const boxData = boxSnapshot.data() as Box | undefined;

    if (!boxData || !boxData.times) return;

    boxData.times = boxData.times.filter((time) => time.id !== timeId);

    await updateDoc(boxReference, {
      times: boxData.times,
    });

    setBox(
      (prevState) =>
      ({
        ...prevState,
        times: boxData.times,
      } as Box)
    );
  };

  // Edit a time
  const editTime = async (
    timeId: string,
    timeData: Pick<Time, 'time' | 'puzzle' | 'scramble' | 'comment'>
  ): Promise<void> => {
    if (!box || !user) return;
    const boxReference = doc(db, 'users', user.uid, 'boxes', box.id);
    const boxSnapshot = await getDoc(boxReference);
    const boxData = boxSnapshot.data() as Box | undefined;

    if (!boxData || !boxData.times) return;

    boxData.times = boxData.times.map((time) => {
      if (time.id === timeId) {
        return { ...time, ...timeData };
      } else {
        return time;
      }
    });

    await updateDoc(boxReference, {
      times: boxData.times,
    });

    setBox(
      (prevState) =>
      ({
        ...prevState,
        times: boxData.times,
      } as Box)
    );
  };

  // Add a social link
  const addSocialLink = async (
    socialLinkId: SocialLinkId,
    href: string
  ): Promise<void> => {
    if (!user) return;
    const profileReference = doc(db, 'users', user.uid);
    const profileSnapshot = await getDoc(profileReference);
    const profileData = profileSnapshot.data() as Profile | undefined;

    if (!profileData) return;
    if (!profileData.socialLinks) profileData.socialLinks = [];
    if (profileData.socialLinks.find((socialLink) => socialLink.id === socialLinkId))
      return;

    profileData.socialLinks.push({
      id: socialLinkId,
      href: href,
    } as SocialLink);

    await updateDoc(profileReference, {
      socialLinks: profileData.socialLinks,
    });

    setProfile(
      (prevState) =>
      ({
        ...prevState,
        socialLinks: profileData.socialLinks,
      } as Profile)
    );
  };

  // Remove a social link
  const removeSocialLink = async (socialLinkId: SocialLinkId): Promise<void> => {
    if (!user) return;
    const profileReference = doc(db, 'users', user.uid);
    const profileSnapshot = await getDoc(profileReference);
    const profileData = profileSnapshot.data() as Profile | undefined;

    if (!profileData || !profileData.socialLinks) return;

    profileData.socialLinks = profileData.socialLinks.filter(
      (socialLink) => socialLink.id !== socialLinkId
    );

    await updateDoc(profileReference, {
      socialLinks: profileData.socialLinks,
    });

    setProfile(
      (prevState) =>
      ({
        ...prevState,
        socialLinks: profileData.socialLinks,
      } as Profile)
    );
  };

  // Edit a social link
  const editSocialLink = async (
    socialLinkId: SocialLinkId,
    href: string
  ): Promise<void> => {
    if (!user) return;
    const profileReference = doc(db, 'users', user.uid);
    const profileSnapshot = await getDoc(profileReference);
    const profileData = profileSnapshot.data() as Profile | undefined;

    if (!profileData || !profileData.socialLinks) return;

    profileData.socialLinks = profileData.socialLinks.map((socialLink) => {
      if (socialLink.id === socialLinkId) {
        return { ...socialLink, href: href };
      } else {
        return socialLink;
      }
    });

    await updateDoc(profileReference, {
      socialLinks: profileData.socialLinks,
    });

    setProfile(
      (prevState) =>
      ({
        ...prevState,
        socialLinks: profileData.socialLinks,
      } as Profile)
    );
  };

  // Set profile to public or private
  const setProfilePrivate = async (isPrivate: boolean): Promise<boolean> => {
    if (!user) throw 'User not found';
    const profileReference = doc(db, 'users', user.uid);
    const profileSnapshot = await getDoc(profileReference);
    const profileData = profileSnapshot.data() as Profile | undefined;

    await updateDoc(profileReference, { isPrivate: isPrivate });
    setProfile((prevState) => ({ ...prevState, isPrivate: isPrivate } as Profile));
    return isPrivate;
  };

  // Set box to public or private
  const setBoxPrivate = async (isPrivate: boolean): Promise<boolean> => {
    if (!box || !user) throw 'User not found';
    const boxReference = doc(db, 'users', user.uid, 'boxes', box.id);
    const boxSnapshot = await getDoc(boxReference);
    const boxData = boxSnapshot.data() as Box | undefined;

    await updateDoc(boxReference, { isPrivate: isPrivate });
    setBox((prevState) => ({ ...prevState, isPrivate: isPrivate } as Box));
    return isPrivate;
  };

  const setTimerActive = (state: boolean): void => {
    setTimerState(state);
  };

  const changePuzzle = (puzzle: Puzzle): void => {
    setCurrentPuzzle(puzzle);
  };

  const value: Context = {
    user,
    boxes,
    box,
    profile,
    timerActive,
    currentPuzzle,
    logIn,
    logOut,
    signUp,
    changePassword,
    changeProfilePicture,
    removeProfilePicture,
    createBox,
    deleteBox,
    editBox,
    changeBox,
    createTime,
    deleteTime,
    editTime,
    addSocialLink,
    removeSocialLink,
    editSocialLink,
    setProfilePrivate,
    setBoxPrivate,
    setTimerActive,
    changePuzzle,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export { DataProvider, useData };
