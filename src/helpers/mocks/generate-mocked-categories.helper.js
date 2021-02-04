'use strict';

const {
  generateMockedCategory,
} = require(`~/helpers/mocks/generate-mocked-category.helper`);

const generateMockedCategories = (categoriesPayloads) => {
  return categoriesPayloads.map(generateMockedCategory);
};

module.exports = {
  generateMockedCategories,
};
