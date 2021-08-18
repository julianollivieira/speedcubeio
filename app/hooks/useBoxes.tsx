import { useState, useEffect } from 'react';
import firebase from '@/utils/firebase';

const useBoxes = (currentUser: any) => {
  const [boxes, setBoxes] = useState<any>(null);
  useEffect(() => {
    if (currentUser) {
      let ref = firebase
        .app('client')
        .database()
        .ref(`/users/${currentUser.uid}`);
      ref.on('value', (snapshot) => {
        let boxesObj = snapshot.child('boxes').val();
        let boxesArr = [];
        for (const property in boxesObj) {
          boxesArr.push({ key: property, box: boxesObj[property] });
        }
        setBoxes(boxesArr);
      });
    }
  }, [currentUser]);

  const createBox = (name: string, icon: string, color: string) => {
    firebase
      .app('client')
      .database()
      .ref(`/users/${currentUser.uid}/boxes`)
      .push()
      .set({
        name: name,
        icon: icon,
        color: color,
      });
  };

  const deleteBox = (id: string) => {};

  const editBox = (id: string) => {};

  return { boxes, createBox, deleteBox, editBox };
};

export default useBoxes;
