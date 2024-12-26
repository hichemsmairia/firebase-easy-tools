const admin = require("firebase-admin");

// English: Initialize the source Firebase project
// French: Initialiser le projet Firebase source
// Arabic: تهيئة مشروع Firebase المصدر
const sourceServiceAccount = require("./source-service-account-key.json");
const sourceApp = admin.initializeApp(
  {
    credential: admin.credential.cert(sourceServiceAccount),
  },
  "source"
);
const sourceAuth = admin.auth(sourceApp);

// English: Initialize the destination Firebase project
// French: Initialiser le projet Firebase de destination
// Arabic: تهيئة مشروع Firebase الهدف
const destinationServiceAccount = require("./destination-service-account-key.json");
const destinationApp = admin.initializeApp(
  {
    credential: admin.credential.cert(destinationServiceAccount),
  },
  "destination"
);
const destinationAuth = admin.auth(destinationApp);

// English: Function to migrate users
// French: Fonction pour migrer les utilisateurs
// Arabic: وظيفة لترحيل المستخدمين
async function migrateUsers() {
  try {
    console.log("Fetching users from the source project...");

    const users = await fetchAllUsers();

    console.log(`Fetched ${users.length} users. Starting migration...`);

    for (const user of users) {
      try {
        await migrateUser(user);
        console.log(`Migrated user: ${user.email}`);
      } catch (error) {
        console.error(`Failed to migrate user ${user.email}:`, error.message);
      }
    }

    console.log("Migration completed successfully.");
  } catch (error) {
    console.error("Error during migration:", error.message);
  }
}

// English: Fetch all users from the source Firebase project
// French: Récupérer tous les utilisateurs du projet Firebase source
// Arabic: جلب جميع المستخدمين من مشروع Firebase المصدر

async function fetchAllUsers(nextPageToken = null, allUsers = []) {
  const listUsersResult = await sourceAuth.listUsers(1000, nextPageToken);
  allUsers = allUsers.concat(listUsersResult.users);

  if (listUsersResult.pageToken) {
    return fetchAllUsers(listUsersResult.pageToken, allUsers);
  }
  return allUsers;
}

// English: Migrate a single user to the destination Firebase project
// French: Migrer un seul utilisateur vers le projet Firebase de destination
// Arabic: ترحيل مستخدم واحد إلى مشروع Firebase الهدف
async function migrateUser(user) {
  if (!user.email) {
    console.warn(`Skipping user without email: ${user.uid}`);
    // English: Skipping user without email
    // French: Ignorer l'utilisateur sans email
    // Arabic: تخطي المستخدم بدون بريد إلكتروني
    return;
  }

  const userData = {
    email: user.email,
    password: "TemporaryPassword123!",
    // English: Set a temporary password
    // French: Définir un mot de passe temporaire
    // Arabic: تعيين كلمة مرور مؤقتة
    emailVerified: user.emailVerified,
    disabled: user.disabled,
  };

  await destinationAuth.createUser(userData);
  console.log(`User ${user.email} created in destination project`);
  // English: User created in destination project
  // French: Utilisateur créé dans le projet de destination
  // Arabic: تم إنشاء المستخدم في مشروع الهدف
}

migrateUsers();
