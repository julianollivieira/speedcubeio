import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/utils/firebase/admin';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = <any>req.query;
  try {
    const userRecord = await admin.app('admin').auth().getUser(id);
    const userDataSnapshot = await admin
      .app('admin')
      .database()
      .ref(`/users/${id}`)
      .once('value');
    res.status(200).json(<any>{
      user: userRecord,
      data: userDataSnapshot.val(),
    });
  } catch (error) {
    console.log('Error fetching user data:', error);
    res.status(404).end();
  }
}
