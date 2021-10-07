import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/utils/firebase/admin';
import { Box } from '@/types';

type Data = {
  user: admin.auth.UserRecord;
  box: Box;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  const { userId, boxId } = req.query;
  try {
    const userRecord = await admin
      .app('admin')
      .auth()
      .getUser(Array.isArray(userId) ? userId[0] : userId);

    const boxReference = admin
      .app('admin')
      .firestore()
      .doc(`users/${userId}/boxes/${boxId}`);
    const boxDocument = await boxReference.get();
    const boxData = boxDocument.data() as Box;

    console.log('🗳️🔢 Read 1 box');

    res.status(200).json({
      user: userRecord,
      box: boxData,
    });
  } catch (error) {
    console.log('🐛', error);
    res.status(404).end();
  }
}
