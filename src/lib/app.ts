import express from 'express';
import episodesController from './controllers/episodes';
import pool from './database/pool';
import setup from './database/setup';
import { handleError, handleNotFound } from './middleware/error-handling';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/episodes', episodesController);

app.use(handleNotFound);
app.use(handleError);

export default app;
