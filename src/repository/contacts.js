const Contact = require('../schemas/contact');

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }

  async listContacts(
    userId,
    { limit = 5, offset = 0, sortBy, sortByDesc, filter },
  ) {
    const result = await this.model.paginate(
      { owner: userId },
      {
        limit,
        offset,
        sort: {
          ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
          ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
        },
        select: filter ? filter.split('|').join(' ') : '',
        populate: { path: 'owner', select: 'email -_id' },
      },
    );
    return result;
  }

  async getById(userId, id) {
    const result = await this.model
      .findOne({ _id: id, owner: userId })
      .populate({
        path: 'owner',
        select: 'email -_id',
      });
    return result;
  }

  async addContact(userId, body) {
    const result = await this.model.create({ ...body, owner: userId });
    return result;
  }

  async updateContact(userId, id, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: id, owner: userId },
      { ...body },
      { new: true },
    );
    return result;
  }

  async removeContact(userId, id) {
    const result = await this.model.findByIdAndDelete({
      _id: id,
      owner: userId,
    });
    return result;
  }
}

module.exports = ContactsRepository;
