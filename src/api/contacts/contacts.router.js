const express = require('express');
const controllerContacts = require('../../controllers/contacts');
const {
  validateCreateContact,
  validateUpdateContact,
} = require('../../validation/contacts');
const guard = require('../../helpers/guard');

const router = express.Router();

router
  .get('/', guard, controllerContacts.listContacts)
  .get('/:contactId', guard, controllerContacts.getById)
  .post('/', guard, validateCreateContact, controllerContacts.addContact)
  .patch(
    '/:contactId',
    guard,
    validateUpdateContact,
    controllerContacts.updateContact,
  )
  .delete('/:contactId', guard, controllerContacts.removeContact);

module.exports = router;
