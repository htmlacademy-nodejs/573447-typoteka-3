'use strict';

const {Router} = require(`express`);
const {checkAlreadyRegister, validateSchema} = require(`~/middlewares`);
const {
  createdUserPayload: createdUserPayloadSchema,
  userLoginPayload: userLoginPayloadSchema,
} = require(`~/schemas`);
const {
  ApiPath,
  HttpCode,
  UsersApiPath,
  UserLoginValidationMessage,
} = require(`~/common/enums`);
const {mapCreatedUser, checkIsPasswordSame} = require(`./helpers`);

const initUsersApi = (app, {usersService}) => {
  const usersRouter = new Router();

  app.use(ApiPath.USERS, usersRouter);

  usersRouter.post(
      UsersApiPath.ROOT,
      [
        checkAlreadyRegister(usersService),
        validateSchema(createdUserPayloadSchema),
      ],
      async (req, res) => {
        const mappedCreatedUser = await mapCreatedUser(req.body);
        const user = await usersService.create(mappedCreatedUser);

        return res.status(HttpCode.CREATED).json(user);
      }
  );

  usersRouter.post(
      UsersApiPath.LOGIN,
      validateSchema(userLoginPayloadSchema),
      async (req, res) => {
        const {email, password} = req.body;

        const user = await usersService.findByEmail(email);

        if (!user) {
          return res.status(HttpCode.UNAUTHORIZE).send({
            messages: [UserLoginValidationMessage.EMAIL_WRONG],
          });
        }

        const isPasswordSame = await checkIsPasswordSame(user, password);

        if (!isPasswordSame) {
          return res.status(HttpCode.UNAUTHORIZE).send({
            messages: [UserLoginValidationMessage.PASSWORD_WRONG],
          });
        }

        return res.status(HttpCode.OK).json(user);
      }
  );
};

module.exports = {
  initUsersApi,
};
