const request = require('supertest');
const app = require('../src/app');
const { HttpCode } = require('../src/helpers/constants');
const {
  contacts,
  newContact,
} = require('../src/services/__mocks__/data-contact');

jest.mock('../src/services');
jest.mock('../src/helpers/guard', () => {
  return (req, res, next) => {
    req.user = { id: 1 };
    next();
  };
});

describe('should handle grt request api/contacts', () => {
  test('should return status 200 for get all contacts', async done => {
    const res = await request(app)
      .get('/api/contacts')
      .set('Accept', 'aplication/json');
    expect(res.status).toEqual(HttpCode.OK);
    expect(res.body).toBeDefined();
    expect(res.body.data.contacts).toBeInstanceOf(Array);
    done();
  });

  test.skip('should return status 200 for get contact by id', async done => {
    const contact = contacts[0];
    const res = await request(app)
      .get(`/api/contacts/${contact._id}`)
      .set('Accept', 'application/json');
    expect(res.status).toEqual(HttpCode.OK);
    expect(res.body).toBeDefined();
    expect(res.body.data.contact._id).toBe(contact._id);
    done();
  });

  test('should return status 404 for find contact by non-exist id', async done => {
    const contact = { _id: 123456 };
    const res = await request(app)
      .get(`/api/contacts/${contact._id}`)
      .set('Accept', 'application/json');
    expect(res.status).toEqual(HttpCode.NOT_FOUND);
    expect(res.body).toBeDefined();
    done();
  });

  test.skip('should return status 201 for create contact', async done => {
    const res = await request(app)
      .post(`/api/contacts}`)
      .send(newContact)
      .set('Accept', 'application/json');
    expect(res.status).toEqual(HttpCode.CREATED);
    expect(res.body).toBeDefined();
    expect(res.body.data.contact.name).toBe(newContact.name);
    expect(res.body.data.contact.email).toBe(newContact.email);
    expect(res.body.data.contact.phone).toBe(newContact.phone);
    done();
  });
});
