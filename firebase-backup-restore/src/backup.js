const admin = require("firebase-admin");
const fs = require("fs");

/**
 * Backup Firestore data to a JSON file.
 * @param {string} filePath - Path to save the backup file.
 *
 * EN: Specify the file path where you want to save the Firestore backup.
 * FR: Spécifiez le chemin du fichier où vous souhaitez sauvegarder les données Firestore.
 * AR: حدد مسار الملف الذي تريد حفظ نسخة احتياطية من بيانات Firestore فيه.
 */
async function backupFirestore(filePath) {
  const db = admin.firestore(); // EN: Initialize Firestore. | FR: Initialiser Firestore. | AR: تهيئة Firestore.
  const collections = await db.listCollections(); // EN: Get all collections. | FR: Récupérer toutes les collections. | AR: الحصول على جميع المجموعات.
  const backupData = {};

  for (const collection of collections) {
    const documents = await collection.get(); // EN: Fetch all documents in the collection. | FR: Récupérer tous les documents dans la collection. | AR: جلب جميع المستندات في المجموعة.
    backupData[collection.id] = {};
    documents.forEach((doc) => {
      backupData[collection.id][doc.id] = doc.data(); // EN: Save document data. | FR: Enregistrer les données du document. | AR: حفظ بيانات المستند.
    });
  }

  fs.writeFileSync(filePath, JSON.stringify(backupData, null, 2), "utf-8");
  // EN: Write backup data to the specified file.
  // FR: Écrire les données de sauvegarde dans le fichier spécifié.
  // AR: كتابة بيانات النسخة الاحتياطية إلى الملف المحدد.
  console.log(`Firestore backup saved to ${filePath}`);
}

/**
 * Backup Realtime Database to a JSON file.
 * @param {string} filePath - Path to save the backup file.
 *
 * EN: Specify the file path where you want to save the Realtime Database backup.
 * FR: Spécifiez le chemin du fichier où vous souhaitez sauvegarder les données de la base de données en temps réel.
 * AR: حدد مسار الملف الذي تريد حفظ نسخة احتياطية من قاعدة البيانات في الوقت الحقيقي فيه.
 */
async function backupRealtimeDatabase(filePath) {
  const db = admin.database(); // EN: Initialize Realtime Database. | FR: Initialiser la base de données en temps réel. | AR: تهيئة قاعدة البيانات في الوقت الحقيقي.
  const snapshot = await db.ref("/").once("value");
  // EN: Fetch all data from the root of the database.
  // FR: Récupérer toutes les données depuis la racine de la base de données.
  // AR: جلب جميع البيانات من جذر قاعدة البيانات.
  const data = snapshot.val();

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  // EN: Write backup data to the specified file.
  // FR: Écrire les données de sauvegarde dans le fichier spécifié.
  // AR: كتابة بيانات النسخة الاحتياطية إلى الملف المحدد.
  console.log(`Realtime Database backup saved to ${filePath}`);
}

// EN: Export the backup functions for Firestore and Realtime Database.
// FR: Exporter les fonctions de sauvegarde pour Firestore et la base de données en temps réel.
// AR: تصدير وظائف النسخ الاحتياطي لـ Firestore وقاعدة البيانات في الوقت الحقيقي.
module.exports = { backupFirestore, backupRealtimeDatabase };
