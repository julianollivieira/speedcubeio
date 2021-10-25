import admin from 'firebase-admin';

const serviceAccount: admin.ServiceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
};

const adminConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://speedcubeio-dev-default-rtdb.europe-west1.firebasedatabase.app',
};

const appNames = admin.apps.map((app: admin.app.App | null) => app?.name);

if (!appNames.includes('admin')) {
  admin.initializeApp(adminConfig, 'admin');
}

export default admin;
