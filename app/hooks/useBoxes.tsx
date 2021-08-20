import { useState, useEffect } from 'react';
import firebase from '@/utils/firebase';

const convertBoxObjectToArray = (obj: any): Array<any> => {
  let arr = [];
  for (const property in obj) {
    arr.push({ key: property, box: obj[property] });
  }
  return arr;
};

const useBoxes = (currentUser: any) => {
  const [boxes, setBoxes] = useState<any>(null);

  useEffect(() => {
    if (currentUser) {
      firebase
        .app('client')
        .database()
        .ref(`/users/${currentUser.uid}/boxes`)
        .on('value', (snapshot) => {
          setBoxes(convertBoxObjectToArray(snapshot.val()));
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

  const deleteBox = (boxId: string) => {
    firebase
      .app('client')
      .database()
      .ref(`/users/${currentUser.uid}/boxes/${boxId}`)
      .remove();
  };

  const editBox = (
    boxId: string,
    name: string,
    icon: string,
    color: string
  ) => {
    firebase
      .app('client')
      .database()
      .ref(`/users/${currentUser.uid}/boxes/${boxId}`)
      .update({
        name: name,
        icon: icon,
        color: color,
      });
  };

  return { boxes, createBox, deleteBox, editBox };
};

export default useBoxes;
