import { useState, useEffect } from 'react';
import firebase from '@/utils/firebase';

const useBoxes = (currentUser: any, boxId: string | string[] | undefined) => {
  const [box, setBox] = useState<any>(null);

  useEffect(() => {
    if (currentUser) {
      firebase
        .app('client')
        .database()
        .ref(`/users/${currentUser.uid}/boxes/${boxId}`)
        .on('value', (snapshot) => {
          setBox(snapshot.val());
        });
    }
  }, [currentUser]);

  return { box };
};

export default useBoxes;
