// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/utils/firebase/admin';
import { FullUser } from '@/types/User';
import { getSocialObjects } from '@/utils/user';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const listUsersResult = await admin.app('admin').auth().listUsers();
  const userData = (
    await admin.app('admin').database().ref('/users/').once('value')
  ).val();

  let users: FullUser[] = [];

  for (const userRecord of listUsersResult.users) {
    const file = await admin
      .app('admin')
      .storage()
      .bucket('gs://speedcubeio-dev.appspot.com')
      .file(`users/${userRecord.uid}/profile.png`);

    const exists = (await file.exists())[0];

    let signedUrls = exists
      ? await file.getSignedUrl({
          action: 'read',
          expires: '01-01-2200',
        })
      : [];

    users.push({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      joinDate: userRecord.metadata.creationTime,
      lastSignInTime: userRecord.metadata.lastSignInTime,
      bio: userData?.bio,
      socials: userData?.socials ? getSocialObjects(userData.socials) : [],
      profilePicture: exists ? signedUrls[0] : undefined,
    });
  }

  res.status(200).json(<any>{ users: users });
}
