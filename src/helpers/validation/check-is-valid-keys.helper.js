'use strict';

const checkIsValidByKeys = (entity, keys) => {
  const entityKeys = Object.keys(entity);
  const isValid = entityKeys.every((key) => keys.includes(key));

  return isValid;
};

module.exports = {
  checkIsValidByKeys,
};
