const { HttpCode } = require('../helpers/constants');
const { ContactsService } = require('../services');

const contactsService = new ContactsService();

const listContacts = (req, res, next) => {
  try {
    const contacts = contactsService.listContacts();
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        contacts,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getById = (req, res, next) => {
  try {
    const contact = contactsService.getById(req.params);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: `${contact} Not Found`,
        data: 'Not Found',
      });
    }
  } catch (err) {
    next(err);
  }
};

const addContact = (req, res, next) => {
  try {
    const contact = contactsService.addContact(req.body);
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        contact,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateContact = (req, res, next) => {
  try {
    const contact = contactsService.updateContact(req.params, req.body);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: `Not Found`,
        data: 'Not Found',
      });
    }
  } catch (err) {
    next(err);
  }
};

const removeContact = (req, res, next) => {
  try {
    const contact = contactsService.removeContact(req.params);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message: `${contact.name} deleted`,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: `Not Found`,
        data: 'Not Found',
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listContacts,
  getById,
  addContact,
  updateContact,
  removeContact,
};
