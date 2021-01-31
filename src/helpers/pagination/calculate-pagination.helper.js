'use strict';

const DEFAULT_PAGE = 1;
const SKIP_DEFAULT = 1;

const calculatePagination = (currentPage = DEFAULT_PAGE, itemsCount) => {
  const parsedPage = Number(currentPage);
  const offset = (parsedPage - SKIP_DEFAULT) * itemsCount;

  return {
    currentPage: parsedPage,
    limit: itemsCount,
    offset,
  };
};

module.exports = {
  calculatePagination,
};
