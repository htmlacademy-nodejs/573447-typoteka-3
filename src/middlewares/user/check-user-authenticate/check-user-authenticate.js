'use strict';

const {SsrMainPath} = require(`~/common/enums`);

const checkUserAuthenticate = (req, res, next) => {
  const {user} = req.session;
  const isLogin = Boolean(user);

  if (!isLogin) {
    return res.redirect(SsrMainPath.LOGIN);
  }

  return next();
};

module.exports = {
  checkUserAuthenticate,
};
