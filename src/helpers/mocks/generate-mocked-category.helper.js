'use strict';

const {CategoryKey} = require(`~/common/enums`);

const generateMockedCategory = (category) => ({
  [CategoryKey.NAME]: category,
});

module.exports = {
  generateMockedCategory,
};
