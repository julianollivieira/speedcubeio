import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/utils/firebase/admin';
import { Box, Profile } from '@/types';

type Data = {
  user: admin.auth.UserRecord;
  box: Box;
  profile: Profile;
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
    const boxData = { id: boxDocument.id, ...boxDocument.data() } as Box;

    console.log('🗳️🔢 Read 1 box');

    const profileReference = admin.app('admin').firestore().doc(`users/${userId}`);
    const profileDocument = await profileReference.get();
    const profileData = profileDocument.data() as Profile;

    console.log('👤🔢 Read 1 profile');

    res.status(200).json({
      user: userRecord,
      box: boxData,
      profile: profileData,
    });
  } catch (error) {
    console.log('🐛', error);
    res.status(404).end();
  }
}
