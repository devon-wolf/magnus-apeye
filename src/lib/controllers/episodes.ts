import { Router } from 'express';
import Episode from '../models/Episode';

const episodesController = Router()
  .get('/', (req, res, next) => {
    try {
      res.send('response');
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
      console.error(error);
    }
  });

export default episodesController;
