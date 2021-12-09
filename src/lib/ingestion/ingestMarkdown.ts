import * as fs from 'fs/promises';

const readRawFile = async (filename: string) => {
  try {
    const data = await fs.readFile(
      `${__dirname}/../../../assets/${filename}.md`,
      {
        encoding: 'utf-8',
      }
    );
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
