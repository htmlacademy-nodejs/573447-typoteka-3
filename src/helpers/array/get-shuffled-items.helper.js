'use strict';

const RANDOM_SEPARATOR = 0.5;

const getShuffledItems = (items) => {
  const shuffledArray = items
    .slice()
    .sort(() => Math.random() - RANDOM_SEPARATOR);

  return shuffledArray;
};

module.exports = {
  getShuffledItems,
};
