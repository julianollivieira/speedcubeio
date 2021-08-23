import admin from '@/utils/firebase-admin';

export default async (idToken: string): Promise<admin.auth.DecodedIdToken> => {
  return admin
    .app('admin')
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken: admin.auth.DecodedIdToken) => {
      return decodedToken;
    });
};
