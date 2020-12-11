'use strict';

const {Router} = require(`express`);
const {getMockedDate} = require(`./helpers`);

const apiRouter = new Router();

(async () => {
  const mockedData = await getMockedDate();

  console.log(mockedData);
})();

module.exports = apiRouter;
