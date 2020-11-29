const { ContactsRepository } = require('../repository');

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepository(),
    };
  }

  async listContacts() {
    const data = await this.repositories.contacts.listContacts();
    return data;
  }

  async getById({ contactId }) {
    const data = await this.repositories.contacts.getById(contactId);

    return data;
  }

  async addContact(body, userId) {
    const data = await this.repositories.contacts.addContact(body, userId);

    return data;
  }

  async updateContact({ contactId }, body) {
    const data = await this.repositories.contacts.updateContact(
      contactId,
      body,
    );

    return data;
  }

  async removeContact({ contactId }) {
    const data = await this.repositories.contacts.removeContact(contactId);

    return data;
  }
}

module.exports = ContactsService;
