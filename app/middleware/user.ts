import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/utils/firebase-admin';

const getUser = (uid: string) =>
  admin
    .auth()
    .getUser(uid)
    .then((userRecord) => {
      return userRecord;
    })
    .catch((error) => {
      console.log('Error fetching user data:', error);
    });

const verifyUser = (req: NextApiRequest, res: any) => {
  if (!req.headers['authorization'])
    return res.status(401).json('Unauthorized');
  const authHeader: string = <string>req.headers['authorization'];
  admin
    .app('admin')
    .auth()
    .verifyIdToken(authHeader)
    .then((decodedToken) => {
      res.user = getUser(decodedToken.uid);
    })
    .catch(() => {
      // return res.status(401).json('Unauthorized');
    });
};

const user = (handler: any) => (req: NextApiRequest, res: any) => {
  res.user = verifyUser(req, res);
  return handler(req, res);
};

export default user;
