import {
  getFirestore,
  collection,
  deleteDoc,
  addDoc,
  serverTimestamp,
  doc,
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
  const boxReference = doc(db, 'users', userId, 'boxes', box.id);
  return deleteDoc(boxReference);
};

const editBox = async (
  userId: string,
  box: Box,
  name: string,
  icon: string,
  color: string
): Promise<void> => {
  const boxReference = doc(db, 'users', userId, 'boxes', box.id);
  updateDoc(boxReference, {
    name: name,
    icon: icon,
    color: color,
  });
};

export { createBox, deleteBox, editBox };
