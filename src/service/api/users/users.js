'use strict';

const {Router} = require(`express`);
const {checkAlreadyRegister, validateSchema} = require(`~/service/middlewares`);
const {createdUserPayload: createdUserPayloadSchema} = require(`~/schemas`);
const {ApiPath, HttpCode, UsersApiPath} = require(`~/common/enums`);
const {mapCreatedUser} = require(`./helpers`);

const initUsersApi = (app, {usersService}) => {
  const usersRouter = new Router();

  app.use(ApiPath.USERS, usersRouter);

  usersRouter.post(
      UsersApiPath.ROOT,
      [
        validateSchema(createdUserPayloadSchema),
        checkAlreadyRegister(usersService),
      ],
      async (req, res) => {
        const mappedCreatedUser = await mapCreatedUser(req.body);
        const user = await usersService.create(mappedCreatedUser);

        return res.status(HttpCode.CREATED).json(user);
      }
  );
};

module.exports = {
  initUsersApi,
};
