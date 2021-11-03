import { NextApiRequest, NextApiResponse } from 'next';
import { Profile } from '@/types';
import app from '@/utils/firebase/admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

type ResponseData = {
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
  const { userId } = req.query;

  let userRecord;

  try {
    userRecord = await auth.getUser(userId.toString());
  } catch (error) {
    userRecord = null;
  }

  try {
    let profileData = null;

    if (userRecord) {
      const profileReference = db.doc(`users/${userId.toString()}`);
      const profileDocument = await profileReference.get();
      profileData = profileDocument.data() as Profile;
    }

    res.status(200).json({
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
