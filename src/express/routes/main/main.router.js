'use strict';

const {Router} = require(`express`);
const {ApiMainRoute} = require(`~/common/enums`);

const mainRouter = new Router();

mainRouter.get(ApiMainRoute.ROOT, (_, res) => {
  const content = {
    title: `Типотека`,
    hiddenTitle: ` Главная страница личного блога Типотека`,
    description: `Это приветственный текст, который владелец блога может выбрать, чтобы описать себя 👏`,
    account: null,
    hasContent: true,
    hasHot: true,
    hasLastComments: true,
  };
  res.render(`pages/main`, content);
});

mainRouter.get(ApiMainRoute.REGISTER, (_, res) => {
  const content = {
    title: `Типотека`,
    error: {
      email: false,
      password: false,
    },
  };

  res.render(`pages/register`, content);
});

mainRouter.get(ApiMainRoute.LOGIN, (_, res) => {
  const content = {
    title: `Типотека`,
    error: {
      email: false,
      password: false,
    },
  };

  res.render(`pages/login`, content);
});

mainRouter.get(ApiMainRoute.SEARCH, (req, res) => {
  const content = {
    title: `Типотека`,
    hiddenTitle: ` Страница поиска личного блога Типотека`,
    account: {
      type: `admin`,
      name: `Алёна Фролова`,
      avatar: `img/avatar-2.png`,
    },
    isResult: false,
    searchResult: {
      type: `list`,
      list: [
        {
          date: {
            stamp: `2019-03-21T20:33`,
            day: `21.03.2019`,
            time: `20:33`,
          },
          link: {
            text: `Huawei открыла в России путешествия на смартфон Mate 30 Pro без сервисов Google`,
            href: `#`,
          },
        },
        {
          date: {
            stamp: `2019-03-21T20:33`,
            day: `21.03.2019`,
            time: `20:33`,
          },
          link: {
            text: `«Яндекс.Метрика» запустила путешествия сервис для оценки эффективности баннеров и видеорекламы в реальном времени`,
            href: `#`,
          },
        },
      ],
    },
    scriptList: [`js/main.js`],
  };

  res.render(`pages/search`, content);
});

module.exports = mainRouter;
