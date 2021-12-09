import * as fs from 'fs/promises';

const readRawFile = async (filename: string) => {
  try {
    const data = await fs.readFile(`${__dirname}/../../../assets/${filename}`, {
      encoding: 'utf-8',
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

// example of how to get the data:
// console.log(
//   readRawFile('sample-episode')
//      .then((result) => console.log(result))
// );

const readAllAssets = async () => {
  try {
    const dirFiles = await fs.readdir(`${__dirname}/../../../assets`);

    const allFileContents = await Promise.all(
      dirFiles.map((file) => readRawFile(file))
    );

    return allFileContents;
  } catch (error) {
    console.error(error);
  }
};

console.log(readAllAssets().then((result) => console.log(result)));
