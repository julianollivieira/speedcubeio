import { DataSnapshot, getDatabase, onValue, ref } from 'firebase/database';
import { User } from 'firebase/auth';
import app from '@/utils/firebase/client';
import Box from '@/types/Box';
import { useEffect, useState } from 'react';
import Time from '@/types/Time';
import { convertTimeObjectToTimeArray } from '@/utils/convert';

const database = getDatabase(app);

const useBox = (currentUser: User | null | undefined, initialBoxId: string) => {
  const [boxId, setBoxId] = useState<string>(initialBoxId);
  const [box, setBox] = useState<Box>();

  useEffect(() => {
    if (initialBoxId) {
      setBoxId(initialBoxId);
    }
  }, [currentUser, initialBoxId]);

  useEffect(() => {
    if (currentUser && boxId) {
      const reference = ref(
        database,
        `/users/${currentUser.uid}/boxes/${boxId}`
      );
      onValue(reference, (snapshot: DataSnapshot) => {
        const box = snapshot.val();
        box.times = convertTimeObjectToTimeArray(box.times);
        setBox(box);
      });
    }
  }, [currentUser, boxId]);

  return { box, setBoxId };
};

export default useBox;
