const { v4: uuidv4 } = require('uuid');
const db = require('../db/contacts');

class ContactsRepository {
  listContacts() {
    return db.get('contacts').value();
  }

  getById(contactId) {
    return db.get('contacts').find({ contactId }).value();
  }

  addContact(body) {
    const contactId = uuidv4();
    const record = {
      contactId,
      ...body,
    };

    db.get('contacts').push(record).write();

    return record;
  }

  updateContact(contactId, body) {
    const record = db.get('contacts').find({ contactId }).assign(body).value();
    db.write();

    return record;
  }

  removeContact(contactId) {
    const [record] = db.get('contacts').remove({ contactId }).write();
    return record;
  }
}

module.exports = ContactsRepository;
