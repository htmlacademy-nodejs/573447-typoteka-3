'use strict';

const multer = require(`multer`);
const {getRandomId, getFileExtension} = require(`~/helpers`);

class DiskStorage {
  constructor({destination}) {
    this._storage = multer.diskStorage({
      destination,
      filename: (_, file, cb) => {
        const uniqueName = getRandomId();
        const extension = getFileExtension(file.originalname);

        cb(null, `${uniqueName}.${extension}`);
      },
    });
  }

  get upload() {
    return multer({
      storage: this._storage,
    });
  }
}

module.exports = DiskStorage;
