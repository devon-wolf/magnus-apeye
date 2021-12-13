import * as fs from 'fs/promises';
import { BulkCreateResponse, EpisodeInput } from '../../types';
import Episode from '../models/Episode';

export const readRawFile = async (filename: string, path = `${__dirname}/../../../assets`): Promise<string | void> => {
  try {
    console.log(`trying to read ${filename}...`)
    const data = await fs.readFile(`${path}/${filename}`, {
      encoding: 'utf-8',
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAssetNames = async (path = `${__dirname}/../../../assets`): Promise<string[] | void> => {
  try {
    const assetNames = await fs.readdir(path);
    return assetNames;
  } catch (error) {
    console.error(error);
  }
};

export const readAllAssets = async (path = `${__dirname}/../../../assets`): Promise<string[] | void> => {
  try {
    const assetNames = (await getAssetNames(path)) as string[];
    const allFileContents = (await Promise.all(
      assetNames.map((assetName) => readRawFile(assetName, path))
    )) as string[];
    return allFileContents;
  } catch (error) {
    console.error(error);
  }
};

export const mungeEpisode = (rawTranscript: string): EpisodeInput => {
  const splitFileContents = rawTranscript.split('---\n\n');
  const metadata = splitFileContents[0];
  const transcript = splitFileContents[1];

  const episodeNumber = Number(
    metadata.split('episode_number:')[1].trim().slice(1, 4)
  );

  const season =
    episodeNumber <= 40
      ? 1
      : episodeNumber <= 80
      ? 2
      : episodeNumber <= 120
      ? 3
      : episodeNumber <= 160
      ? 4
      : 5;

  const title = metadata.split('episode_title:')[1].split('\n')[0].trim();

  const releaseDate = new Date(metadata.split('date:')[1].trim().slice(0, 10));

  return {
    episodeNumber,
    season,
    title,
    releaseDate,
    transcript,
  };
};

export const seedEpisodesIntoDb = async (): Promise<BulkCreateResponse | void> => {
  try {
    console.log('trying to seed episodes...');
    const episodeFiles = (await readAllAssets()) as string[];
    if (!episodeFiles) throw new Error('Could not read episode files');

    const seedResults = await Episode.bulkCreate(
      episodeFiles.map((file) => mungeEpisode(file))
    );

    return seedResults;
  } catch (error) {
    console.error(error);
  }
};