const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
  }),
  databaseURL: 'https://ulimadrive-999.firebaseio.com',
  storageBucket: 'gs://ulimadrive-999.appspot.com'
});

module.exports = admin.storage()