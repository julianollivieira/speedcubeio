import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/utils/firebase/admin';
import { Box } from '@/types';

type Data = {
  user: admin.auth.UserRecord;
  boxes: Box[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  const { id } = req.query;
  try {
    const userRecord = await admin
      .app('admin')
      .auth()
      .getUser(Array.isArray(id) ? id[0] : id);

    const boxesReference = admin.app('admin').firestore().collection(`users/${id}/boxes`);
    const boxesDocuments = await boxesReference.get();
    const boxes: Box[] = boxesDocuments.docs.map((boxDoc) => boxDoc.data() as Box);

    console.log(`📦🔢 Read ${boxes.length} box${boxes.length === 1 ? '' : 'es'}`);

    res.status(200).json({
      user: userRecord,
      boxes: boxes,
    });
  } catch (error) {
    console.log('🐛', error);
    res.status(404).end();
  }
}
