import express from 'express';
import episodesController from './controllers/episodes';
import { handleError, handleNotFound } from './middleware/error-handling';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/episodes', episodesController);

app.use(handleNotFound);
app.use(handleError);

export default app;
