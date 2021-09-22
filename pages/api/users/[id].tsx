import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/utils/firebase/admin';

type Data = {
  user: admin.auth.UserRecord;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query as any;
  try {
    const userRecord = await admin.app('admin').auth().getUser(id);
    res.status(200).json({
      user: userRecord,
    });
  } catch (error) {
    console.log('Error fetching user data:', error);
    res.status(404).end();
  }
}
