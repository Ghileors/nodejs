const express = require('express');
const router = express.Router();
const controllerUsers = require('../../controllers/users');
const { createAccountLimiter } = require('../../helpers/reate-limit');
const guard = require('../../helpers/guard');
const upload = require('../../helpers/multer');

router.get('/current', guard, controllerUsers.current);
router.get('/auth/verify/:verificationToken', controllerUsers.verify);
router.post('/auth/register', createAccountLimiter, controllerUsers.reg);
router.post('/auth/login', controllerUsers.login);
router.post('/auth/logout', guard, controllerUsers.logout);
router.patch(
  '/avatars',
  guard,
  upload.single('avatar'),
  controllerUsers.avatars,
);

module.exports = router;
