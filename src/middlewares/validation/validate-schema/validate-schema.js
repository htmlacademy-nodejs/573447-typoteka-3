'use strict';

const {HttpCode} = require(`~/common/enums`);
const {ValidationError} = require(`~/common/exceptions`);

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
