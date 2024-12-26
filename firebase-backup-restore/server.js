const admin = require("firebase-admin");
const { backupFirestore, backupRealtimeDatabase } = require("./src/backup");
const { restoreFirestore, restoreRealtimeDatabase } = require("./src/restore");
const serviceAccount = require("./config.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

  // firebase storageBucket قم بكتابة اسم ==> storageBucket: "example",
  // écrire le nom de storageBucket depuis firebase ==>  storageBucket: "example",
  // write your firebase storageBucket name ==> storageBucket: "example",

  storageBucket: "your-project-id.appspot.com", 
});

(async () => {
  try {
    console.log("Starting Backup and Restore Examples...");

    // Backup Firestore
    await backupFirestore("./firestore-backup.json");

    // Backup Realtime Database
    await backupRealtimeDatabase("./realtime-backup.json");

    // Restore Firestore
    await restoreFirestore("./firestore-backup.json");

    // Restore Realtime Database
    await restoreRealtimeDatabase("./realtime-backup.json");

    console.log("Backup and Restore operations completed.");
  } catch (error) {
    console.error("Error during operations:", error);
  }
})();
