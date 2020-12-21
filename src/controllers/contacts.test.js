const contacts = require('./contacts');
const { HttpCode } = require('../helpers/constants');
const {
  contacts: fakeData,
  newContact,
} = require('../services/__mocks__/data-contact');
const { ContactsService } = require('../services');

jest.mock('../services');

describe('unit testing of contacts', () => {
  let req, res, next;

  beforeEach(() => {
    req = { user: { id: 1 } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(data => data),
    };
    next = jest.fn();
  });

  test('should get all contacts', async () => {
    const result = await contacts.listContacts(req, res, next);
    expect(ContactsService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result).toHaveProperty('status', 'success');
    expect(result).toHaveProperty('code', 200);
    expect(result).toHaveProperty('data');
  });

  test('should get error when get all contacts', async () => {
    const result = await contacts.listContacts({}, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test('should found contact by id', async () => {
    const { _id, name, email } = fakeData[0];

    req.params = { id: _id };

    const result = await contacts.getById(req, res, next);
    expect(ContactsService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data.contact).toHaveProperty('_id', _id);
    expect(result.data.contact).toHaveProperty('name', name);
    expect(result.data.contact).toHaveProperty('email', email);
  });

  test('should found contact by non-existent id', async () => {
    req.params = { id: 1 };

    const result = await contacts.getById(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({
      status: HttpCode.NOT_FOUND,
      message: `Not Found`,
      data: 'Contact Not Found',
    });
  });

  test('should create new contact', async () => {
    const { name, email, phone } = newContact;

    req.body = newContact;

    const result = await contacts.addContact(req, res, next);
    expect(ContactsService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data.contact).toHaveProperty('_id');
    expect(result.data.contact).toHaveProperty('name', name);
    expect(result.data.contact).toHaveProperty('email', email);
    expect(result.data.contact).toHaveProperty('phone', phone);
  });

  test('should update contact by id', async () => {
    const { _id } = fakeData[0];

    req.params = { id: _id };
    const name = 'UpdatedContact';
    req.body = { name };

    const result = await contacts.updateContact(req, res, next);
    expect(ContactsService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data.contact).toHaveProperty('_id', _id);
    expect(result.data.contact).toHaveProperty('name', name);
  });

  test('should update contact by non-existent id', async () => {
    req.params = { id: 1 };
    const name = 'UpdatedContact';
    req.body = { name };

    const result = await contacts.updateContact(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({
      status: HttpCode.NOT_FOUND,
      message: `Not Found`,
      data: 'Contact Not Found',
    });
  });

  test('should remove contact by id', async () => {
    const { _id, name } = fakeData[0];

    req.params = { id: _id };

    const result = await contacts.removeContact(req, res, next);
    expect(ContactsService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data.contact).toHaveProperty('_id', _id);
    expect(result.data.contact).toHaveProperty('name', name);
  });

  test('should remove contact by non-existent id', async () => {
    req.params = { id: 1 };

    const result = await contacts.removeContact(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({
      status: HttpCode.NOT_FOUND,
      message: `Not Found`,
      data: 'Contact Not Found',
    });
  });
});
