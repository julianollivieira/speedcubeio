import { App, getApps, initializeApp, cert, ServiceAccount } from 'firebase-admin/app';

const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
};

const adminConfig = {
  credential: cert(serviceAccount),
  databaseURL: 'https://speedcubeio-dev-default-rtdb.europe-west1.firebasedatabase.app',
};

const apps: App[] = getApps();

const app: App =
  apps.find((app: App) => app.name === 'admin') ?? initializeApp(adminConfig, 'admin');

export default app;
