import express from 'express';
import episodesController from './controllers/episodes';
import pool from './database/pool';
import setup from './database/setup';
import { handleError, handleNotFound } from './middleware/error-handling';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO replace this, should work for now
app.post('/setup-db', (req, res, next) => {
  return setup(pool)
    .then(() => res.send('Database setup complete.'))
    .catch(next);
});
app.use('/episodes', episodesController);

app.use(handleNotFound);
app.use(handleError);

export default app;
