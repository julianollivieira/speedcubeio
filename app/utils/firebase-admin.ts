const admin = require('firebase-admin');

let apps = admin.apps.map((e: any) => e.name);
console.log('admin.apps', apps);

const serviceAccount = {
  type: process.env.FIREBASE_ADMIN_TYPE,
  project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
  private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: (<string>process.env.FIREBASE_ADMIN_PRIVATE_KEY).replace(
    /\\n/g,
    '\n'
  ),
  client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
  token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
};

console.log(serviceAccount);

const adminConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://speedcubeio-dev-default-rtdb.europe-west1.firebasedatabase.app',
};

if (!apps.includes('admin')) {
  admin.initializeApp(adminConfig, 'admin');
}

export default admin;
