'use strict';

const axios = require(`axios`);
const {ApiPath, HttpMethod} = require(`~/common/enums`);
const {HttpError} = require(`~/common/exceptions`);
const {checkIsOkStatusCode} = require(`./helpers`);

class Api {
  constructor({baseURL, timeout}) {
    this._http = axios.create({
      baseURL,
      timeout,
    });
  }

  static checkStatus(response) {
    const isOk = checkIsOkStatusCode(response.status);

    if (!isOk) {
      throw new HttpError({
        status: response.status,
        message: `${response.status}: ${response.statusText}`,
      });
    }

    return response;
  }

  static getData(response) {
    return response.data;
  }

  static catchError(err) {
    throw err;
  }

  _load(
      url,
      options = {
        method: HttpMethod.GET,
      }
  ) {
    return this._http
      .request({url, ...options})
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  getArticles() {
    return this._load(ApiPath.ARTICLES).then(Api.getData);
  }

  getArticle(id) {
    return this._load(`${ApiPath.ARTICLES}/${id}`).then(Api.getData);
  }

  search(query) {
    return this._load(ApiPath.SEARCH, {
      params: {
        query,
      },
    }).then(Api.getData);
  }

  getCategories() {
    return this._load(ApiPath.CATEGORIES).then(Api.getData);
  }

  createArticle(payload) {
    return this._load(ApiPath.ARTICLES, {
      method: HttpMethod.POST,
      data: payload,
    }).then(Api.getData);
  }
}

module.exports = Api;
