const express = require('express');
const cors = require('cors');
const { HttpCode } = require('./helpers/constants');
const routerContacts = require('./api/contacts/contacts.router');
const routerUsers = require('./api/users/users.router');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/contacts', routerContacts);
app.use('/api/users', routerUsers);

app.use((req, res, next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: `Use api on routes ${req.baseUrl}/api/contacts`,
    data: 'Not found',
  });
});

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? 'Internal server error' : err.data,
  });
});

module.exports = app;
