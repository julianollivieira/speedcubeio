import { useState, useEffect } from 'react';
import firebase from '@/utils/firebase';
import Box from '@/types/Box';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const convertBoxObjectToBoxArray = (boxObject: any): Array<Box> => {
  let boxArray: Array<Box> = [];
  for (const property in boxObject) {
    boxArray.push({
      id: property,
      name: boxObject[property].name,
      icon: boxObject[property].icon,
      color: boxObject[property].color,
      creationTime: boxObject[property].creationTime,
      times: boxObject[property].times,
    });
  }
  return boxArray;
};

const useBoxes = (currentUser: firebase.User | null | undefined) => {
  const [boxes, setBoxes] = useState<Array<Box>>();

  useEffect(() => {
    if (currentUser) {
      firebase
        .app('client')
        .database()
        .ref(`/users/${currentUser.uid}/boxes`)
        .on('value', (snapshot: firebase.database.DataSnapshot) => {
          setBoxes(convertBoxObjectToBoxArray(snapshot.val()));
        });
    }
  }, [currentUser]);

  const createBox = (name: string, icon: string, color: string): Promise<any> =>
    firebase
      .app('client')
      .database()
      .ref(`/users/${currentUser?.uid}/boxes`)
      .push()
      .set({
        name: name,
        icon: icon,
        color: color,
        creationTime: dayjs().utc().format(),
      });

  const deleteBox = (boxId: string): Promise<any> =>
    firebase
      .app('client')
      .database()
      .ref(`/users/${currentUser?.uid}/boxes/${boxId}`)
      .remove();

  const editBox = (
    boxId: string,
    name: string,
    icon: string,
    color: string
  ): Promise<any> =>
    firebase
      .app('client')
      .database()
      .ref(`/users/${currentUser?.uid}/boxes/${boxId}`)
      .update({
        name: name,
        icon: icon,
        color: color,
      });

  return { boxes, createBox, deleteBox, editBox };
};

export default useBoxes;
