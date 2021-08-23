import { useState, useEffect } from 'react';
import firebase from '@/utils/firebase';
import Time from '@/types/Time';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const convertTimeObjectToTimeArray = (timeObject: any): Array<Time> => {
  let timeArray: Array<Time> = [];
  for (const property in timeObject) {
    timeArray.push({
      id: property,
      time: timeObject[property].time,
      puzzle: timeObject[property].puzzle,
      comment: timeObject[property].comment,
    });
  }
  return timeArray;
};

const useTimes = (currentUser: firebase.User | null | undefined) => {
  const [times, setTimes] = useState<Array<Time>>();

  // useEffect(() => {
  //   if (currentUser) {
  //     firebase
  //       .app('client')
  //       .database()
  //       .ref(`/users/${currentUser.uid}/boxes/${boxId}/times`)
  //       .on('value', (snapshot: firebase.database.DataSnapshot) => {
  //         setTimes(convertTimeObjectToTimeArray(snapshot.val()));
  //       });
  //   }
  // }, [currentUser]);

  const createTime = (
    boxId: string,
    time: number,
    scramble: string,
    puzzle: string
  ): Promise<any> => {
    console.log(boxId);
    return firebase
      .app('client')
      .database()
      .ref(`/users/${currentUser?.uid}/boxes/${boxId}/times`)
      .push()
      .set({
        time: time,
        scramble: scramble,
        puzzle: puzzle,
        comment: '',
        creationTime: dayjs().utc().format(),
      });
  };

  const deleteTime = (boxId: string, timeId: string): Promise<any> =>
    firebase
      .app('client')
      .database()
      .ref(`/users/${currentUser?.uid}/boxes/${boxId}/times/${timeId}`)
      .remove();

  const editTime = (
    boxId: string,
    timeId: string,
    time: number,
    scramble: string,
    puzzle: string,
    comment: string
  ): Promise<any> =>
    firebase
      .app('client')
      .database()
      .ref(`/users/${currentUser?.uid}/boxes/${boxId}/times/${timeId}`)
      .update({
        time: time,
        scramble: scramble,
        puzzle: puzzle,
        comment: comment,
      });

  return { times, createTime, deleteTime, editTime };
};

export default useTimes;
