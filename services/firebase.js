const admin = require("firebase-admin");

let db = null;

var serviceAccount = require("../firebase-config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

db = admin.firestore();
module.exports.db = db;
module.exports.admin = admin;