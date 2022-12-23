import * as fs from 'fs/promises';

const DEFAULT_PATH = `${__dirname}/../../../assets`;

export const readRawFile = async (
  filename: string,
  path = DEFAULT_PATH
): Promise<string | void> => {
  try {
    const data = await fs.readFile(`${path}/${filename}`, {
      encoding: 'utf-8',
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAssetNames = async (
  path = DEFAULT_PATH
): Promise<string[] | void> => {
  try {
    const assetNames = await fs.readdir(path);
    return assetNames;
  } catch (error) {
    console.error(error);
  }
};

export const readAllAssets = async (path = DEFAULT_PATH): Promise<string[]> => {
  try {
    let assetNames = (await getAssetNames(path)) as string[];
    assetNames = assetNames.filter((name) => name !== 'LICENSE.md');

    const allFileContents = (await Promise.all(
      assetNames.map((assetName) => readRawFile(assetName, path))
    )) as string[];
    return allFileContents;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
