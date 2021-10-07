import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/utils/firebase/admin';
import { Profile } from '@/types';

type Data = {
  user: admin.auth.UserRecord;
  profile: Profile;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  const { userId } = req.query;
  try {
    const userRecord = await admin
      .app('admin')
      .auth()
      .getUser(Array.isArray(userId) ? userId[0] : userId);

    const profileReference = admin.app('admin').firestore().doc(`users/${userId}`);
    const profileDocument = await profileReference.get();
    const profileData = profileDocument.data() as Profile;

    console.log('👤🔢 Read 1 profile');

    res.status(200).json({
      user: userRecord,
      profile: profileData,
    });
  } catch (error) {
    console.log('🐛', error);
    res.status(404).end();
  }
}
