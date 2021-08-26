import { getDatabase, push, ref, remove, update } from 'firebase/database';
import { User } from 'firebase/auth';
import app from '@/utils/firebase/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const database = getDatabase(app);

const useTimes = (currentUser: User | null | undefined) => {
  const createTime = (
    boxId: string,
    time: number,
    puzzle: string,
    comment: string
  ): void => {
    const reference = ref(
      database,
      `/users/${currentUser?.uid}/boxes/${boxId}/times`
    );
    push(reference, {
      time: time,
      puzzle: puzzle,
      comment: comment,
      creationTime: dayjs().utc().format(),
    });
  };

  const deleteTime = (boxId: string, timeId: string): void => {
    const reference = ref(
      database,
      `/users/${currentUser?.uid}/boxes/${boxId}/times/${timeId}`
    );
    remove(reference);
  };

  const editTime = (
    boxId: string,
    timeId: string,
    time: string,
    puzzle: string,
    comment: string
  ): void => {
    const reference = ref(
      database,
      `/users/${currentUser?.uid}/boxes/${boxId}/times/${timeId}`
    );
    update(reference, {
      time: time,
      puzzle: puzzle,
      comment: comment,
    });
  };

  return { createTime, deleteTime, editTime };
};

export default useTimes;
