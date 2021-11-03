import { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/utils/firebase/admin';
import { Box, Profile } from '@/types';

type ResponseData = {
  boxes: [] | Box[];
  profile: null | Profile;
  user: {
    uid: string;
    displayName: string;
    photoURL: string;
    metadata: {
      creationTime: string;
    };
  };
};

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

    // if (!userRecord) {
    //   res.status(422).json({ error: 'user-not-found' });
    // }

    const profileReference = admin.app('admin').firestore().doc(`users/${userId}`);
    const profileDocument = await profileReference.get();
    const profileData = profileDocument.data() as Profile;

    const boxesReference = admin
      .app('admin')
      .firestore()
      .collection(`users/${userId}/boxes`);
    const boxesDocuments = await boxesReference.get();
    const boxes: Box[] = boxesDocuments.docs
      .filter((boxDoc) => !boxDoc.data().isPrivate)
      .map(
        (boxDoc) =>
          ({
            id: boxDoc.id,
            ...boxDoc.data(),
          } as Box)
      );

    res.status(200).json({
      boxes: profileData.isPrivate ? [] : boxes,
      profile: profileData.isPrivate ? null : profileData,
      user: {
        uid: userRecord.uid,
        displayName: userRecord.displayName ?? '',
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
