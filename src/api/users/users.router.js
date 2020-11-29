const express = require('express');
const controllerUsers = require('../../controllers/users');
const guard = require('../../helpers/guard');

const router = express.Router();

router
  .post('/auth/register', controllerUsers.reg)
  .post('/auth/login', controllerUsers.login)
  .post('/auth/logout', guard, controllerUsers.logout);

module.exports = router;
