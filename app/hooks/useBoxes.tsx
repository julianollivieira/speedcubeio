import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
} from '@firebase/firestore';
import app from '@/utils/firebase/client';
import { Box } from '@/types';
import { useUser } from '@/hooks/useUser';

type Context = {
  boxes: Box[];
  createBox: (boxData: Pick<Box, 'name' | 'icon' | 'color'>) => Promise<void>;
  deleteBox: (boxId: string) => Promise<void>;
  editBox: (
    boxId: string,
    boxData: Pick<Box, 'name' | 'icon' | 'color'>
  ) => Promise<void>;
};

const db = getFirestore(app);

const BoxContext = createContext<Context>({
  boxes: [],
  createBox: undefined,
  deleteBox: undefined,
  editBox: undefined,
}); // TODO: fix

const useBoxes = (): Context => useContext(BoxContext);

const BoxProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const { user } = useUser();

  // Set boxes on user load
  useEffect(() => {
    if (user) {
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
    }
  }, [user]);

  // Create a box
  const createBox = async (
    boxData: Pick<Box, 'name' | 'icon' | 'color'>
  ): Promise<void> => {
    if (!user) return;
    const newBoxRef = await addDoc(collection(db, 'users', user.uid, 'boxes'), boxData);
    setBoxes((prevState) => [...prevState, { id: newBoxRef.id, ...boxData } as Box]);
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

  const value: Context = { boxes, createBox, deleteBox, editBox };
  return <BoxContext.Provider value={value}>{children}</BoxContext.Provider>;
};

export { BoxProvider, useBoxes };
