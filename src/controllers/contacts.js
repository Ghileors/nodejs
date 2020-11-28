const { HttpCode } = require('../helpers/constants');
const { ContactsService } = require('../services');

const contactsService = new ContactsService();

const listContacts = async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
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

const getById = async (req, res, next) => {
  try {
    const contact = await contactsService.getById(req.params);
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
        data: 'Contact Not Found',
      });
    }
  } catch (err) {
    next(err);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = await contactsService.addContact(req.body);
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

const updateContact = async (req, res, next) => {
  try {
    const contact = await contactsService.updateContact(req.params, req.body);
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
        data: 'Contact Not Found',
      });
    }
  } catch (err) {
    next(err);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contact = await contactsService.removeContact(req.params);
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
        data: 'Contact Not Found',
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
