import { Router } from 'express';
import { GET_EPISODES } from '../../constants/constants';
import { CollectionResponse } from '../../types';
import Episode from '../models/Episode';

const episodesController = Router()
  .get('/', async (req, res, next) => {
    try {
      const { count } = await Episode.getEpisodeCount();
      const episodes = await Episode.getAll();
      const body: CollectionResponse<Episode> = {
        count,
        description: GET_EPISODES,
        data: episodes,
      };
      res.send(body);
    } catch (error) {
      next(error);
    }
  })
  .get('/:episodeNumber', async (req, res, next) => {
    try {
      const episode = await Episode.getByEpisodeNumber(
        Number(req.params.episodeNumber)
      );
      res.send(episode);
    } catch (error) {
      next(error);
    }
  })
  // TODO come up with a better plan than this, but it does work
  .post('/seed-db', async (req, res, next) => {
    try {
      await Episode.triggerSeed();
      res.send('Episodes seeded! ...and database wiped...');
    } catch (error) {
      next(error);
    }
  });

export default episodesController;
