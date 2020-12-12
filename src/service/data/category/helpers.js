'use strict';

const getCategories = (offers) => {
  const categories = offers.reduce(
      (acc, offer) => [...acc, ...offer.category],
      []
  );

  return categories;
};

module.exports = {
  getCategories,
};
