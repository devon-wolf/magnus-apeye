import * as fs from 'fs/promises';
import { TranscriptFileData } from '../../types';

const DEFAULT_PATH = `${__dirname}/../../../assets`;

export const readRawFile = async (
  filename: string,
  path = DEFAULT_PATH
): Promise<TranscriptFileData> => {
  try {
    const data = await fs.readFile(`${path}/${filename}`, {
      encoding: 'utf-8',
    });
    return { filename, data };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAssetNames = async (path = DEFAULT_PATH): Promise<string[]> => {
  try {
    const assetNames = await fs.readdir(path);
    return assetNames;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const readAllAssets = async (
  path = DEFAULT_PATH
): Promise<TranscriptFileData[]> => {
  try {
    let assetNames = await getAssetNames(path);
    assetNames = assetNames.filter((name) => name !== 'LICENSE.md');

    const allFileContents = await Promise.all(
      assetNames.map((assetName) => readRawFile(assetName, path))
    );

    return allFileContents;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
