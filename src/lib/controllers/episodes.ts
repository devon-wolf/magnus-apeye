import { Router } from 'express';

import { readAllAssets } from '../ingestion/ingestMarkdown';
import EpisodeCollection from '../models/EpisodeCollection';

async function getEpisodeCollection(): Promise<EpisodeCollection> {
  try {
    const rawTranscripts = await readAllAssets();
    if (!rawTranscripts) throw new Error('Could not read episode files');
    return new EpisodeCollection(rawTranscripts);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const episodeCollection = await getEpisodeCollection();

const episodesController = Router()
  .get('/', async (req, res, next) => {
    try {
      const episodes = episodeCollection.getAll();
      res.send(episodes);
    } catch (error) {
      next(error);
    }
  })
  .get('/:episodeNumber', async (req, res, next) => {
    try {
      const episode = episodeCollection.getByEpisodeNumber(
        Number(req.params.episodeNumber)
      );
      res.send(episode);
    } catch (error) {
      next(error);
    }
  });

export default episodesController;
