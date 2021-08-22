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
    .then((listUsersResult: admin.auth.ListUsersResult) => {
      res.status(200).json(<any>listUsersResult);
    })
    .catch((error: any) => {
      console.log('Error fetching user data:', error);
      res.status(200).json({ name: 'John Doe' });
    });
}
