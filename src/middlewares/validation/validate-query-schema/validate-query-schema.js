'use strict';

const {HttpCode} = require(`~/common/enums`);
const {ValidationError} = require(`~/common/exceptions`);

const validateQuerySchema = (schema, param) => async (req, res, next) => {
  const currentParam = req.query[param];

  try {
    await schema.validateAsync(currentParam, {
      abortEarly: false,
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
  validateQuerySchema,
};
