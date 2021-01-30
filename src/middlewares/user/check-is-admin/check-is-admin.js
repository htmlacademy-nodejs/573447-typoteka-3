'use strict';

const {SsrMainPath} = require(`~/common/enums`);

const checkIsAdmin = (req, res, next) => {
  const {user} = req.session;
  const isAdmin = Boolean(user && user.isAdmin);

  if (!isAdmin) {
    return res.redirect(SsrMainPath.ROOT);
  }

  return next();
};

module.exports = {
  checkIsAdmin,
};
