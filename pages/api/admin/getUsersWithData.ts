// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/utils/firebase/admin';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  admin
    .app('admin')
    .database()
    .ref('/users/')
    .once('value')
    .then((snapshot) => {
      res.status(200).json(<any>snapshot.val());
    });
}
