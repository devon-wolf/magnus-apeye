import { Router } from 'express';

const episodesController = Router().get('/', (req, res, next) => {
  try {
    res.send('response');
  } catch (error) {
    next(error);
  }
});

export default episodesController;
