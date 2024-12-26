# HOW TO USE

## 1. Fill the Configuration File

In the script, the `config.json` file contains your Firebase service account key. Download the JSON key from your Firebase project and save it as `config.json` in the same directory as this script.


### 2. Update the `storageBucket` Field

Replace the `storageBucket` placeholder with the name of your Firebase Storage bucket.  
- **Example**:  
```javascript
storageBucket: "your-project-id.appspot.com",
```

#### 3. Specify the Folder to Download

Replace `"images/"` in the `downloadFirebaseFolder` function call with the name of your folder in Firebase Storage.  
- **Example**:
```javascript
downloadFirebaseFolder("images/");
```

---

# COMMENT UTILISER

## 1. Remplissez le fichier de configuration

Dans le script, le fichier `config.json` contient votre clé de compte de service Firebase. Téléchargez la clé JSON depuis votre projet Firebase et enregistrez-la sous le nom `config.json` dans le même répertoire que ce script.

### 2. Mettez à jour le champ `storageBucket`

Remplacez le champ `storageBucket` par le nom de votre bucket Firebase Storage.  
- **Exemple** :  
```javascript
storageBucket: "votre-id-projet.appspot.com",
```
#### 3. Spécifiez le dossier à télécharger

Remplacez `"images/"` dans `downloadFirebaseFolder` de la fonction downloadFirebaseFolder par le nom de votre dossier dans Firebase Storage.- **Example**:
```javascript
downloadFirebaseFolder("images/");
```

---



### Traduction en arabe :

```markdown
# كيفية الاستخدام

## 1. قم بملء ملف التكوين

في السكربت، يحتوي ملف `config.json` على مفتاح حساب خدمة Firebase الخاص بك. قم بتنزيل مفتاح JSON من مشروع Firebase الخاص بك واحفظه باسم `config.json` في نفس المجلد مع هذا السكربت.

### 2. تحديث حقل `storageBucket`

استبدل الحقل `storageBucket` باسم حاوية Firebase Storage الخاصة بك.  
- **مثال**:  
```javascript
storageBucket: "your-project-id.appspot.com",
```
### 3. تحديد المجلد المراد تحميله
استبدل "images/" في استدعاء الدالة downloadFirebaseFolder باسم المجلد الخاص بك في Firebase Storage.

- **مثال**:  
```javascript
downloadFirebaseFolder("images/");
```
