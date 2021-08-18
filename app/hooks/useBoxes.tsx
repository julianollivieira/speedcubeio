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
      ref.once('value').then((snapshot) => {
        let boxesObj = snapshot.child('boxes').val();
        let boxesArr = [];
        for (const property in boxesObj) {
          boxesArr.push({ key: property, box: boxesObj[property] });
        }
        setBoxes(boxesArr);
      });
    }
  }, [currentUser]);
  return { boxes };
};

export default useBoxes;
