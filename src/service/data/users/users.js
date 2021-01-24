'use strict';

class Users {
  constructor({userModel}) {
    this._User = userModel;
  }

  async create(createdUser) {
    const user = await this._User.create(createdUser);

    return user.get();
  }

  findByEmail(email) {
    return this._User.findOne({
      where: {
        email,
      },
    });
  }
}

module.exports = Users;
