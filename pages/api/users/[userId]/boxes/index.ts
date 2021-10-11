import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/utils/firebase/admin';
import { Box, Profile } from '@/types';

type Data = {
  user: admin.auth.UserRecord;
  boxes: Box[];
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

    const boxesReference = admin
      .app('admin')
      .firestore()
      .collection(`users/${userId}/boxes`);
    const boxesDocuments = await boxesReference.get();
    const boxes: Box[] = boxesDocuments.docs.map((boxDoc) => boxDoc.data() as Box);

    console.log(`📦🔢 Read ${boxes.length} box${boxes.length === 1 ? '' : 'es'}`);

    const profileReference = admin.app('admin').firestore().doc(`users/${userId}`);
    const profileDocument = await profileReference.get();
    const profileData = profileDocument.data() as Profile;

    console.log('👤🔢 Read 1 profile');

    res.status(200).json({
      user: userRecord,
      boxes: boxes,
      profile: profileData,
    });
  } catch (error) {
    console.log('🐛', error);
    res.status(404).end();
  }
}
