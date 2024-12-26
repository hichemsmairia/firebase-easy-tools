const admin = require("firebase-admin");
const fs = require("fs");

/**
 * Restore Firestore data from a JSON file.
 * @param {string} filePath - Path to the JSON file containing backup data.
 *
 * EN: Specify the file path to the JSON file that contains the Firestore backup data.
 * FR: Spécifiez le chemin du fichier JSON contenant les données de sauvegarde Firestore.
 * AR: حدد مسار ملف JSON الذي يحتوي على بيانات النسخة الاحتياطية لـ Firestore.
 */
async function restoreFirestore(filePath) {
  const db = admin.firestore(); // EN: Initialize Firestore. | FR: Initialiser Firestore. | AR: تهيئة Firestore.
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  // EN: Read and parse the JSON file.
  // FR: Lire et analyser le fichier JSON.
  // AR: قراءة وتحليل ملف JSON.

  for (const [collectionId, documents] of Object.entries(data)) {
    // EN: Iterate over collections in the backup data.
    // FR: Parcourir les collections dans les données de sauvegarde.
    // AR: المرور على المجموعات في بيانات النسخة الاحتياطية.
    for (const [docId, docData] of Object.entries(documents)) {
      // EN: Iterate over documents in each collection.
      // FR: Parcourir les documents dans chaque collection.
      // AR: المرور على المستندات في كل مجموعة.
      await db.collection(collectionId).doc(docId).set(docData);
      // EN: Restore each document to Firestore.
      // FR: Restaurer chaque document dans Firestore.
      // AR: استعادة كل مستند في Firestore.
    }
  }
  console.log(`Firestore data restored from ${filePath}`);
  // EN: Print success message after restoring data.
  // FR: Afficher un message de succès après la restauration des données.
  // AR: طباعة رسالة نجاح بعد استعادة البيانات.
}

/**
 * Restore Realtime Database data from a JSON file.
 * @param {string} filePath - Path to the JSON file containing backup data.
 *
 * EN: Specify the file path to the JSON file that contains the Realtime Database backup data.
 * FR: Spécifiez le chemin du fichier JSON contenant les données de sauvegarde de la base de données en temps réel.
 * AR: حدد مسار ملف JSON الذي يحتوي على بيانات النسخة الاحتياطية لقاعدة البيانات في الوقت الحقيقي.
 */
async function restoreRealtimeDatabase(filePath) {
  const db = admin.database(); // EN: Initialize Realtime Database. | FR: Initialiser la base de données en temps réel. | AR: تهيئة قاعدة البيانات في الوقت الحقيقي.
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  // EN: Read and parse the JSON file.
  // FR: Lire et analyser le fichier JSON.
  // AR: قراءة وتحليل ملف JSON.

  await db.ref("/").set(data);
  // EN: Restore the entire database using the parsed JSON data.
  // FR: Restaurer toute la base de données en utilisant les données JSON analysées.
  // AR: استعادة قاعدة البيانات بالكامل باستخدام بيانات JSON التي تم تحليلها.

  console.log(`Realtime Database data restored from ${filePath}`);
  // EN: Print success message after restoring data.
  // FR: Afficher un message de succès après la restauration des données.
  // AR: طباعة رسالة نجاح بعد استعادة البيانات.
}

// EN: Export the restore functions for Firestore and Realtime Database.
// FR: Exporter les fonctions de restauration pour Firestore et la base de données en temps réel.
// AR: تصدير وظائف الاستعادة لـ Firestore وقاعدة البيانات في الوقت الحقيقي.
module.exports = { restoreFirestore, restoreRealtimeDatabase };
