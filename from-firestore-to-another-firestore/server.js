const admin = require("firebase-admin");

// Initialize Source Firestore
// Initialiser la source Firestore
// تهيئة مصدر Firestore
const sourceServiceAccount = require("./source.json");
const sourceApp = admin.initializeApp(
  {
    credential: admin.credential.cert(sourceServiceAccount),
  },
  "source"
);
const sourceDb = sourceApp.firestore();

// Initialize Target Firestore
// Initialiser la Firestore cible
// تهيئة Firestore الهدف

const targetServiceAccount = require("./target.json");
const targetApp = admin.initializeApp(
  {
    credential: admin.credential.cert(targetServiceAccount),
  },
  "target"
);
const targetDb = targetApp.firestore();

// Write source and target collections names
// Écrivez les noms des collections source et cible
// اكتب أسماء المجموعات المصدر والهدف

async function migrateCollection(sourceCollection, targetCollection) {
  try {
    const snapshot = await sourceDb.collection(sourceCollection).get();
    if (snapshot.empty) {
      console.log(`No documents found in collection: ${sourceCollection}`);
      return;
    }

    // Loop through each document and insert it into the target collection
    // Parcourir chaque document et l'insérer dans la collection cible
    // قم بالتكرار على كل مستند وأدرجه في المجموعة الهدف    const promises = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      promises.push(
        targetDb.collection(targetCollection).doc(doc.id).set(data)
      );
    });

    // Wait for all writes to complete
    // Attendre que toutes les écritures soient terminées
    // انتظر حتى تكتمل جميع عمليات الكتابة

    await Promise.all(promises);
    console.log(
      `Successfully migrated ${snapshot.size} documents from '${sourceCollection}' to '${targetCollection}'.`
    );
  } catch (error) {
    console.error("Error during migration:", error);
  }
}

// Migrate a collection
// Migrer une collection
// نقل مستند معلومات

(async () => {
  const sourceCollectionName = "source-collection-name"; // Replace with the name of your source collection -- Remplacez par le nom de votre collection source --- استبدل باسم مجموعة المصدر الخاصة بك
  const targetCollectionName = "target-collection-name"; // Replace with the name of your target collection --- Remplacez par le nom de votre collection cible --- استبدل باسم مجموعة الهدف الخاصة بك

  await migrateCollection(sourceCollectionName, targetCollectionName);

  // Close both apps after migration
  // Fermez les deux applications après la migration (Firebase)
  // أغلق كلا التطبيقين بعد الترحيل (Firebase)
  sourceApp.delete();
  targetApp.delete();
})();
