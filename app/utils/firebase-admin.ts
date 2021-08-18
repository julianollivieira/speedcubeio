const admin = require('firebase-admin');

let apps = admin.apps.map((e: any) => e.name);
console.log('admin.apps', apps);

const serviceAccount = require('../../serviceAccountKey.json');

const adminConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://speedcubeio-dev-default-rtdb.europe-west1.firebasedatabase.app',
};

if (!apps.includes('admin')) {
  admin.initializeApp(adminConfig, 'admin');
}

export default admin;
