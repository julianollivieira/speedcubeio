import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/utils/firebase-admin';
import getUserIdToken from '@/utils/admin/getUserIdToken';
import verifyToken from '@/utils/admin/verifyToken';
import Box from '@/types/Box';

const db: admin.database.Database = admin.app('admin').database();

const convertBoxObjectToBoxArray = (boxObject: any): Array<Box> => {
  let boxArray: Array<Box> = [];
  for (const property in boxObject) {
    boxArray.push({
      id: property,
      name: boxObject[property].name,
      icon: boxObject[property].icon,
      color: boxObject[property].color,
      creationTime: boxObject[property].creationTime,
      times: boxObject[property].times,
    });
  }
  return boxArray;
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // Return 405 error if method is not GET
  if (req.method !== 'GET') return res.status(405).json('Method Not Allowed');

  getUserIdToken(req, res).then((userIdToken: string) => {
    verifyToken(userIdToken).then(
      (idToken: admin.auth.DecodedIdToken) => {
        var ref = db.ref(`/users/${idToken.uid}/boxes/`);
        ref.once('value', function (snapshot) {
          const boxes = convertBoxObjectToBoxArray(snapshot.val());
          return res.status(200).json(boxes);
        });
      },
      () => {
        return res.status(401).json('Unauthorized');
      }
    );
  });

  return false;
};

export default handler;
