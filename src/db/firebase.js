const admin = require('firebase-admin')

var serviceAccount = require('../../serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ulimadrive-999.firebaseio.com',
  storageBucket: 'gs://ulimadrive-999.appspot.com'
});

module.exports = admin.storage()