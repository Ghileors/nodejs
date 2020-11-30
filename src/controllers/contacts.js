const { HttpCode } = require('../helpers/constants');
const { ContactsService } = require('../services');

const contactsService = new ContactsService();

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await contactsService.listContacts(userId, req.query);
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        ...contacts,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsService.getById(userId, req.params);
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
    const userId = req.user.id;
    const contact = await contactsService.addContact(userId, req.body);
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
    const userId = req.user.id;
    const contact = await contactsService.updateContact(
      userId,
      req.params,
      req.body,
    );
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
    const userId = req.user.id;
    const contact = await contactsService.removeContact(userId, req.params);
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
