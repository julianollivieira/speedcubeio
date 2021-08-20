import { useState, useEffect } from 'react';
import firebase from '@/utils/firebase';
import dayjs from 'dayjs';

const convertTimesObjectToArray = (obj: any): Array<any> => {
  let arr = [];
  for (const property in obj) {
    arr.push({ key: property, time: obj[property] });
  }
  return arr;
};

const useTimes = (currentUser: any, boxId: string) => {
  const [times, setTimes] = useState<any>(null);
  useEffect(() => {
    if (currentUser) {
      firebase
        .app('client')
        .database()
        .ref(`/users/${currentUser.uid}/boxes/${boxId}/times`)
        .on('value', (snapshot) => {
          console.log(convertTimesObjectToArray(snapshot.val()));
          setTimes(convertTimesObjectToArray(snapshot.val()));
        });
    }
  }, [currentUser]);

  const createTime = (time: number, scramble: string, puzzle: string) => {
    firebase
      .app('client')
      .database()
      .ref(`/users/${currentUser.uid}/boxes/${boxId}/times`)
      .push()
      .set({
        time: time,
        scramble: scramble,
        puzzle: puzzle,
        comment: '',
        creationTime: dayjs().format(),
      });
  };

  const deleteTime = (timeId: string) => {
    firebase
      .app('client')
      .database()
      .ref(`/users/${currentUser.uid}/boxes/${boxId}/times/${timeId}`)
      .remove();
  };

  const editTime = (
    timeId: string,
    time: number,
    scramble: string,
    puzzle: string,
    comment: string
  ) => {
    firebase
      .app('client')
      .database()
      .ref(`/users/${currentUser.uid}/boxes/${boxId}/times/${timeId}`)
      .update({
        time: time,
        scramble: scramble,
        puzzle: puzzle,
        comment: comment,
      });
  };

  return { times, createTime, deleteTime, editTime };
};

export default useTimes;
