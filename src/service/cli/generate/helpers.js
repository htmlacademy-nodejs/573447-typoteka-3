'use strict';

const {writeToFile, paintMessage, readFile} = require(`~/helpers`);
const {MessageColor, CliExitCode} = require(`~/common/enums`);
const {MocksConfig} = require(`./common`);

const savePublicationsToFile = async (mockedPublications) => {
  try {
    await writeToFile(MocksConfig.FILE_NAME, JSON.stringify(mockedPublications));

    console.log(paintMessage(`Operation success. File created.`, MessageColor.GREEN));
  } catch (err) {
    console.error(paintMessage(`Can't write data to file...`, MessageColor.RED));

    process.exit(CliExitCode.ERROR);
  }
};

const readPublicationsFileContent = async (path) => {
  try {
    const content = await readFile(path);

    return content.split(`\n`);
  } catch (err) {
    console.error(paintMessage(err, `red`));

    return [];
  }
};

module.exports = {
  savePublicationsToFile,
  readPublicationsFileContent,
};
