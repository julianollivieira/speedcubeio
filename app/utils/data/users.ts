import { Box, User } from '@/types';
import { User as FirebaseUser } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  DocumentData,
} from 'firebase/firestore';
import app from '@/utils/firebase/client';
import admin from '@/utils/firebase/admin';

const db = getFirestore(app);

export const getUser = async (
  user: FirebaseUser | admin.auth.UserRecord
): Promise<User> => {
  // Get user data
  const userSnapshot = await getDoc(doc(db, 'users', user.uid));
  const userData: DocumentData | undefined = userSnapshot.data();
  console.log('🧑 1 user read');

  // Get boxes data
  const boxesSnapshot = await getDocs(collection(db, 'users', user.uid, 'boxes'));
  const boxes: Box[] = boxesSnapshot.docs.map((boxDoc): Box => {
    return {
      id: boxDoc.id,
      ...boxDoc.data(),
    } as Box;
  });
  console.log(
    `📦 ${boxesSnapshot.docs.length} box read${boxesSnapshot.docs.length === 1 ? '' : 's'
    }`
  );

  return {
    id: user.uid,
    displayName: user.displayName ?? '',
    email: user.email ?? '',
    joinDate: user.metadata.creationTime ?? '',
    lastSignInTime: user.metadata.lastSignInTime ?? '',
    profilePicture: '', // TODO: Add profile picture from storage
    boxes: boxes,
    socialLinks: userData?.socialLinks,
    isPrivate: userData?.isPrivate,
    isVerified: userData?.isVerified,
  };
};
