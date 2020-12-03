const Joi = require('joi');
const { HttpCode } = require('../helpers/constants');

const schemaCreateContact = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'ru', 'uk', 'net', 'ca', 'org'] },
    })
    .required(),
  phone: Joi.string().min(7).max(15).required(),
  owner: Joi.object().optional(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(2).max(30).optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'ru', 'uk', 'net', 'ca', 'org'] },
    })
    .optional(),

  phone: Joi.string().min(7).max(15).optional(),
  owner: Joi.object().optional(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);

  if (error) {
    const [{ message }] = error.details;

    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Field: ${message.replace(/"/g, '')}`,
      data: 'Bad Request',
    });
  }

  next();
};

module.exports.validateCreateContact = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next);
};

module.exports.validateUpdateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
