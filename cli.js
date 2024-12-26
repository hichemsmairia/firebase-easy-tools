#!/usr/bin/env node

import inquirer from "inquirer";

import path from "path";
import fs from "fs";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename.substring(1, __filename.length));

const messages = {
  en: {
    selectLanguage: "Select your language:",
    projectQuestion: "Which project would you like to install?",
    runningInstallation: "Running installation...",
    installationComplete: "Installation complete!",
    steps: "Follow these steps to start your project:",
    step1: "1. cd",
    step2: "2. npm install",
    step3:
      "3. open the folder with your code editor and make sure you put the right firebase configuration",
    step4: "4. npm start",
    error: "An error occurred during installation:",
  },
  fr: {
    selectLanguage: "Sélectionnez votre langue :",
    projectQuestion: "Quel projet souhaitez-vous installer ?",
    runningInstallation: "Installation en cours...",
    installationComplete: "Installation terminée !",
    steps: "Suivez ces étapes pour démarrer votre projet :",
    step1: "1. cd",
    step2: "2. npm install",
    step3:
      "3. Ouvrez le dossier avec votre éditeur de code et assurez-vous de mettre la bonne configuration Firebase.",

    step4: "4. npm start",
    error: "Une erreur s'est produite pendant l'installation :",
  },
  ar: {
    selectLanguage: "كتغل رتخا",
    projectQuestion: "؟هتيبثت يف بغرت عورشملا وهام",
    runningInstallation: "...تيبثتلا يراج",
    installationComplete: "!تيبثتلا لمتكأ",
    steps: ":كعورشم ءدب تاوطخلا عبتا",
    step1: "cd ",
    step2: "install npm ",
    step3: "install npm ",
    step4:
      "افتح المجلد باستخدام محرر الأكواد وتأكد من وضع إعدادات Firebase الصحيحة.",
    error: ":تيبثتأل ءاطخ ثدح",
  },
};

async function main() {
  console.log(`                
    ***********------welcome-bienvenue-ابحرم------*********
                         `);

  const { language } = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: "Select your language:",
      choices: [
        { name: "English", value: "en" },
        { name: "Français", value: "fr" },
        { name: "ةيبرع", value: "ar" },
      ],
    },
  ]);

  const lang = messages[language];

  const choices = [
    "download-folder-data-tool",
    "from-firestore-to-another-firestore",
    "migrate-users",
    "firebase-backup-restore",
  ];

  const { project } = await inquirer.prompt([
    {
      type: "list",
      name: "project",
      message: lang.projectQuestion,
      choices,
    },
  ]);

  console.log(`You selected: ${project}`);
  console.log(lang.runningInstallation);

  try {
    const sourceFolder = path.normalize(path.join(__dirname, project));
    const destinationFolder = path.normalize(path.join(process.cwd(), project));

    if (!fs.existsSync(sourceFolder)) {
      throw new Error(`Source folder not found: ${sourceFolder}`);
    }

    fs.cpSync(sourceFolder, destinationFolder, { recursive: true });

    console.log(lang.installationComplete);
    console.log(lang.steps);
    console.log(lang.step1 + " " + project);
    console.log(lang.step2);
    console.log(lang.step3);
  } catch (error) {
    console.error(`${lang.error} ${error.message}`);
  }
}

main();
