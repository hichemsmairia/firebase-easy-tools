const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
const serviceAccount = require("./config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

  // firebase storageBucket قم بكتابة اسم ==> storageBucket: "example",
  // écrire le nom de storageBucket depuis firebase ==>  storageBucket: "example",
  // write your firebase storageBucket name ==> storageBucket: "example",

  storageBucket: "your-project-id.appspot.com",
});

const bucket = admin.storage().bucket();

async function downloadFirebaseFolder(folder) {
  const [files] = await bucket.getFiles({ prefix: folder });
  const downloadPromises = files.map(async (file) => {
    const destination = path.join(__dirname, "downloads", file.name);
    const dir = path.dirname(destination);

    fs.mkdirSync(dir, { recursive: true });

    console.log(`Downloading: ${file.name}`);
    await file.download({ destination });
    console.log(`Downloaded to: ${destination}`);
  });

  await Promise.all(downloadPromises);
  console.log("All files downloaded!");
}
//Let's suppose that your folder is named "images".
//Supposons que votre dossier s'appelle "images".
//لنفترض أن المجلد الخاص بك يسمى "images".

downloadFirebaseFolder("images/");

// You will find the result in the "download" folder.
// Tu vas trouver le résultat dans le dossier "download".
// ستجد النتيجة في المجلد "download".
