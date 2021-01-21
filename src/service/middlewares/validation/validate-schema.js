'use strict';

const {ValidationError} = require(`joi`);
const {HttpCode} = require(`~/common/enums`);

const validateSchema = (schema) => async (req, res, next) => {
  const {body} = req;

  try {
    await schema.validateAsync(body, {
      abortEarly: false,
      convert: false,
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      const {details} = err;

      return res.status(HttpCode.BAD_REQUEST).send({
        messages: details.map((error) => error.message),
      });
    }
  }

  return next();
};

module.exports = {
  validateSchema,
};
