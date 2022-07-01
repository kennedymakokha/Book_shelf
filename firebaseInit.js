var admin = require('firebase-admin');

var googleApplicationCredentials  = require('./settings')

const serviceAccount = require('./learnnia-3475a-firebase-adminsdk-b3d2b-6a23ee27f1.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://learnnia-2caec-default-rtdb.europe-west1.firebasedatabase.app/'
});
module.exports = admin;
// const messaging = admin.messaging();
// module.exports = messaging