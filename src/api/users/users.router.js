const express = require('express');
const controllerUsers = require('../../controllers/users');
const guard = require('../../helpers/guard');
const { createAccountLimiter } = require('../../helpers/reate-limit');

const router = express.Router();

router
  // .get('/users/current')
  .post('/auth/register', createAccountLimiter, controllerUsers.reg)
  .post('/auth/login', controllerUsers.login)
  .post('/auth/logout', guard, controllerUsers.logout);

module.exports = router;
