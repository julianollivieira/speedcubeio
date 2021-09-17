import {
  getDatabase,
  ref,
  push,
  update,
  remove,
  onValue,
  DataSnapshot,
} from 'firebase/database';
import { User } from '@firebase/auth';
import { useEffect, useState } from 'react';
import app from '@/utils/firebase/client';
import Box from '@/types/Box';
import {
  convertBoxObjectToBoxArray,
  convertTimeObjectToTimeArray,
} from '@/utils/convert';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const database = getDatabase(app);

const useBoxes = (currentUser: User | null | undefined) => {
  const [boxes, setBoxes] = useState<Box[]>();

  useEffect(() => {
    if (currentUser) {
      const reference = ref(database, `/users/${currentUser.uid}/boxes`);
      onValue(reference, (snapshot: DataSnapshot) => {
        const boxArray = convertBoxObjectToBoxArray(snapshot.val());
        boxArray.map((box: Box) => {
          box.times = convertTimeObjectToTimeArray(box.times);
        });
        setBoxes(boxArray);
      });
    }
  }, [currentUser]);

  const createBox = (name: string, icon: string, color: string): void => {
    const reference = ref(database, `/users/${currentUser?.uid}/boxes`);
    push(reference, {
      name: name,
      icon: icon,
      color: color,
      creationTime: dayjs().utc().format(),
    });
  };

  const deleteBox = (boxId: string): void => {
    const reference = ref(
      database,
      `/users/${currentUser?.uid}/boxes/${boxId}`
    );
    remove(reference);
  };

  const editBox = (
    boxId: string,
    name: string,
    icon: string,
    color: string
  ): void => {
    const reference = ref(
      database,
      `/users/${currentUser?.uid}/boxes/${boxId}`
    );
    update(reference, {
      name: name,
      icon: icon,
      color: color,
    });
  };

  return { boxes, createBox, deleteBox, editBox };
};

export default useBoxes;
