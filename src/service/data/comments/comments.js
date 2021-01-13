'use strict';

class Comments {
  constructor({commentModel}) {
    this._Comment = commentModel;
  }

  findAll(articleId) {
    return this._Comment.findAll({
      where: {
        articleId,
      },
      raw: true,
    });
  }

  create(articleId, comment) {
    return this._Comment.create({
      articleId,
      ...comment,
    });
  }

  async drop(commentId) {
    const deletedRows = await this._Comment.destroy({
      where: {
        id: commentId,
      },
    });

    return Boolean(deletedRows);
  }
}

module.exports = Comments;
