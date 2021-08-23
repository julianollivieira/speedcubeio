import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/utils/firebase-admin';
import getUserIdToken from '@/utils/admin/getUserIdToken';
import verifyToken from '@/utils/admin/verifyToken';
import { convertBoxObjectToBoxArray } from '@/utils/convert';
import Box from '@/types/Box';

const db: admin.database.Database = admin.app('admin').database();

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  // Return 405 error if method is not GET
  if (req.method !== 'GET') return res.status(405).json('Method Not Allowed');

  getUserIdToken(req, res).then((userIdToken: string) => {
    verifyToken(userIdToken).then(
      (idToken: admin.auth.DecodedIdToken) => {
        const ref = db.ref(`/users/${idToken.uid}/boxes/`);
        ref.once('value', function (snapshot) {
          const boxes: Array<Box> = convertBoxObjectToBoxArray(snapshot.val());
          return res.status(200).json(boxes);
        });
      },
      () => {
        return res.status(401).json('Unauthorized');
      }
    );
  });
};

export default handler;
