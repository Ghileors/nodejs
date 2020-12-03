const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();
const app = require('./app');
const db = require('./db/contacts');

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);

const isAccessible = path => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async folder => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIsNotExist(UPLOAD_DIR);

    console.log(`Server running on PORT ${PORT}`);
  });
}).catch(err => {
  console.log(`Server not running. Error message: ${err.message}`);
  process.exit(1);
});
