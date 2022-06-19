

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const db =admin.firestore()
const blog = db.collection('blog')
module.exports = blog
