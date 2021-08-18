// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/utils/firebase-admin';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  admin
    .app('admin')
    .auth()
    .listUsers()
    .then((listUsersResult: any) => {
      console.log('Successfully fetched user data:');
      listUsersResult.users.forEach((userRecord: any) => {
        console.log(userRecord.toJSON());
      });
      res.status(200).json(listUsersResult);
    })
    .catch((error: any) => {
      console.log('Error fetching user data:', error);
      res.status(200).json({ name: 'John Doe' });
    });
}
