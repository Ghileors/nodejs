const express = require('express');
const controllerContacts = require('../../controllers/contacts');
const {
  validateCreateContact,
  validateUpdateContact,
} = require('../../validation/contacts');

const router = express.Router();

router
  .get('/', controllerContacts.listContacts)
  .get('/:contactId', controllerContacts.getById)
  .post('/', validateCreateContact, controllerContacts.addContact)
  .patch('/:contactId', validateUpdateContact, controllerContacts.updateContact)
  .delete('/:contactId', controllerContacts.removeContact);

module.exports = router;
