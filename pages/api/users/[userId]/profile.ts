import { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/utils/firebase/admin';
import { Profile } from '@/types';

type ResponseData = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): Promise<void> {
  const { userId } = req.query;

  try {
    const userRecord = await admin
      .app('admin')
      .auth()
      .getUser(Array.isArray(userId) ? userId[0] : userId);

    if (!userRecord) {
      res.status(422).json({ error: 'user-not-found' });
    }

    const profileReference = admin.app('admin').firestore().doc(`users/${userId}`);
    const profileDocument = await profileReference.get();
    const profileData = profileDocument.data() as Profile;

    res.status(200).json({
      profile: profileData.isPrivate ? null : profileData,
      user: {
        uid: userRecord.uid,
        displayName: userRecord.displayName,
        photoURL: userRecord.photoURL ?? '/images/default_user_profile.jpg',
        metadata: {
          creationTime: userRecord.metadata.creationTime,
        },
      },
    });
  } catch (error) {
    console.log('🐛', error);
    res.status(500).end();
  }
}
