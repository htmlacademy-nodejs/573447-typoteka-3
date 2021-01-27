'use strict';

const axios = require(`axios`);
const {ApiPath, HttpMethod, HttpCode, UsersApiPath} = require(`~/common/enums`);
const {HttpError} = require(`~/common/exceptions`);

class Api {
  constructor({baseURL, timeout}) {
    this._http = axios.create({
      baseURL,
      timeout,
    });
  }

  static getData(response) {
    return response.data;
  }

  static catchError(err) {
    const {response} = err;
    const status = response.status || HttpCode.INTERNAL_SERVER_ERROR;
    const messages = response.data.messages || [];

    throw new HttpError({
      status,
      messages,
    });
  }

  _load(
      url,
      options = {
        method: HttpMethod.GET,
      }
  ) {
    return this._http
      .request({url, ...options})
      .then(Api.getData)
      .catch(Api.catchError);
  }

  getArticles() {
    return this._load(ApiPath.ARTICLES);
  }

  getPageArticles({offset, limit}) {
    return this._load(ApiPath.ARTICLES, {
      params: {
        offset,
        limit,
      },
    });
  }

  getArticle(id) {
    return this._load(`${ApiPath.ARTICLES}/${id}`);
  }

  search(query) {
    return this._load(ApiPath.SEARCH, {
      params: {
        query,
      },
    });
  }

  getCategories() {
    return this._load(ApiPath.CATEGORIES);
  }

  createArticle(payload) {
    return this._load(ApiPath.ARTICLES, {
      method: HttpMethod.POST,
      data: payload,
    });
  }

  updateArticle(articleId, payload) {
    return this._load(`${ApiPath.ARTICLES}/${articleId}`, {
      method: HttpMethod.PUT,
      data: payload,
    });
  }

  createComment(articleId, payload) {
    return this._load(`${ApiPath.ARTICLES}/${articleId}/comments`, {
      method: HttpMethod.POST,
      data: payload,
    });
  }

  registerUser(payload) {
    return this._load(ApiPath.USERS, {
      method: HttpMethod.POST,
      data: payload,
    });
  }

  loginUser(payload) {
    return this._load(`${ApiPath.USERS}${UsersApiPath.LOGIN}`, {
      method: HttpMethod.POST,
      data: payload,
    });
  }
}

module.exports = Api;
