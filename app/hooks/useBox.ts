import { useState, useEffect } from 'react';
import firebase from '@/utils/firebase';
import Box from '@/types/Box';

const useBoxes = (
  currentUser: firebase.User | null | undefined,
  boxId: string | string[] | undefined
) => {
  const [box, setBox] = useState<Box>();

  useEffect(() => {
    if (currentUser) {
      firebase
        .app('client')
        .database()
        .ref(`/users/${currentUser.uid}/boxes/${boxId}`)
        .on('value', (snapshot: firebase.database.DataSnapshot) => {
          setBox(snapshot.val());
        });
    }
  }, [currentUser]);

  return { box };
};

export default useBoxes;
