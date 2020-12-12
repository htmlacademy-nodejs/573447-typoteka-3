'use strict';

const checkIsValidByKeys = (entity, keys) => {
  const entityKeys = Object.keys(entity);
  const isValid = keys.every((key) => entityKeys.includes(key));

  return isValid;
};

module.exports = {
  checkIsValidByKeys,
};
