import { NextApiRequest, NextApiResponse } from 'next';
import { Box, Profile } from '@/types';
import app from '@/utils/firebase/admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

type ResponseData = {
  box: Box | null;
  profile: Profile | null;
  user: {
    uid: string;
    displayName: string;
    photoURL: string;
    metadata: {
      creationTime: string;
    };
  } | null;
};

const auth = getAuth(app);
const db = getFirestore(app);

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  const { userId, boxId } = req.query;
  let userRecord;
  userId.toString();

  try {
    userRecord = await auth.getUser(userId.toString());
  } catch (error) {
    userRecord = null;
  }

  try {
    let profileData = null;

    if (userRecord) {
      const profileReference = db.doc(`users/${userId}`);
      const profileDocument = await profileReference.get();
      profileData = profileDocument.data() as Profile;
    }

    let boxData: Box | null = null;
    if (userRecord && !profileData?.isPrivate) {
      const boxReference = db.doc(`users/${userId.toString()}/boxes/${boxId.toString()}`);
      const boxDocument = await boxReference.get();
      boxData = { id: boxDocument.id, ...boxDocument.data() } as Box;
    }

    res.status(200).json({
      box: boxData?.isPrivate ? null : boxData,
      profile: profileData?.isPrivate ? null : profileData,
      user: userRecord
        ? {
            uid: userRecord.uid,
            displayName: userRecord.displayName ?? '',
            photoURL: userRecord.photoURL ?? '/images/default_user_profile.jpg',
            metadata: {
              creationTime: userRecord.metadata.creationTime,
            },
          }
        : null,
    });
  } catch (error) {
    console.log('🐛', error);
    res.status(500).end();
  }
};
export default handler;
