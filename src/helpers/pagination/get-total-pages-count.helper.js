'use strict';

const getTotalPagesCount = (count, itemsCount) => Math.ceil(count / itemsCount);

module.exports = {
  getTotalPagesCount,
};
