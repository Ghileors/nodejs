const { ContactsRepository } = require('../repository');

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepository(),
    };
  }

  async listContacts(userId, query) {
    const data = await this.repositories.contacts.listContacts(userId, query);
    const { docs: contacts, totalDocs: total, limit, offset } = data;
    return { contacts, total, limit, offset };
  }

  async getById(userId, { contactId }) {
    const data = await this.repositories.contacts.getById(userId, contactId);

    return data;
  }

  async addContact(userId, body) {
    const data = await this.repositories.contacts.addContact(userId, body);

    return data;
  }

  async updateContact(userId, { contactId }, body) {
    const data = await this.repositories.contacts.updateContact(
      userId,
      contactId,
      body,
    );

    return data;
  }

  async removeContact(userId, { contactId }) {
    const data = await this.repositories.contacts.removeContact(
      userId,
      contactId,
    );

    return data;
  }
}

module.exports = ContactsService;
