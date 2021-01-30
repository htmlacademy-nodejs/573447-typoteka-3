'use strict';

const {CommentKey} = require(`~/common/enums`);

class Comments {
  constructor({commentModel}) {
    this._Comment = commentModel;
  }

  findAll(limit, order) {
    return this._Comment.findAll({
      order: [[CommentKey.CREATED_AT, order]],
      limit,
    });
  }

  findAllByArticleId(articleId) {
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
