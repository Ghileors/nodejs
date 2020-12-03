const express = require('express');
const router = express.Router();
const controllerUsers = require('../../controllers/users');
const { createAccountLimiter } = require('../../helpers/reate-limit');
const guard = require('../../helpers/guard');
const upload = require('../../helpers/multer');

router
  .get('/current', guard, controllerUsers.getCurrentUser)
  .post('/auth/register', createAccountLimiter, controllerUsers.reg)
  .post('/auth/login', controllerUsers.login)
  .post('/auth/logout', guard, controllerUsers.logout);
router.patch(
  '/users/avatars',
  guard,
  upload.single('avatar'),
  controllerUsers.avatars,
);

module.exports = router;
