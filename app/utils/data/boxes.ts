import {
  getFirestore,
  collection,
  deleteDoc,
  addDoc,
  serverTimestamp,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  DocumentData,
  DocumentSnapshot,
} from 'firebase/firestore';
import app from '@/utils/firebase/client';
import { Box } from '@/types';

const db = getFirestore(app);

const createBox = async (
  userId: string,
  name: string,
  icon: string,
  color: string
): Promise<DocumentSnapshot<DocumentData>> => {
  const ref = await addDoc(collection(db, 'users', userId, 'boxes'), {
    name: name,
    icon: icon,
    color: color,
    creationTime: serverTimestamp(),
  });
  return getDoc(ref);
};

const deleteBox = async (userId: string, box: Box): Promise<void> => {
  const timesCollection = collection(db, 'users', userId, 'boxes', box.id, 'times');
  const timesSnapshot = await getDocs(timesCollection);

  let deletedCount = 0;
  for (const timeDocument of timesSnapshot.docs) {
    await deleteDoc(timeDocument.ref);
    deletedCount++;
  }

  if (deletedCount !== timesSnapshot.docs.length)
    throw "Couldn't delete all times from box";

  const boxDocument = doc(db, 'users', userId, 'boxes', box.id);
  return deleteDoc(boxDocument);
};

const editBox = async (
  userId: string,
  box: Box,
  name: string,
  icon: string,
  color: string
): Promise<DocumentSnapshot<DocumentData>> => {
  const boxRef = doc(db, 'users', userId, 'boxes', box.id);
  updateDoc(boxRef, {
    name: name,
    icon: icon,
    color: color,
  });
  return getDoc(boxRef);
};

export { createBox, deleteBox, editBox };
