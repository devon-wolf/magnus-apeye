import { BulkCreateResponse, DatabaseEpisode, EpisodeInput } from '../../types';
import pool from '../database/pool';

class Episode {
  id: string;
  episodeNumber: number;
  title: string;
  season: number;
  transcript: string;
  releaseDate: Date;

  constructor({
    id,
    episode_number,
    title,
    season,
    transcript,
    release_date,
  }: DatabaseEpisode) {
    this.id = id;
    this.episodeNumber = episode_number;
    this.title = title;
    this.season = season;
    this.transcript = transcript;
    this.releaseDate = release_date;
  }

  static shapeInput(rawTranscript: string): EpisodeInput {
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

    const releaseDate = new Date(
      metadata.split('date:')[1].trim().slice(0, 10)
    );

    return {
      episodeNumber,
      season,
      title,
      releaseDate,
      transcript,
    };
  }

  static async create(episode: EpisodeInput): Promise<Episode | unknown> {
    const { episodeNumber, title, season, transcript, releaseDate } = episode;
    try {
      const { rows } = await pool.query(
        `
            INSERT INTO episodes (episode_number, title, season, transcript, release_date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `,
        [episodeNumber, title, season, transcript, releaseDate]
      );
      return new Episode(rows[0]);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async bulkCreate(
    episodes: EpisodeInput[]
  ): Promise<BulkCreateResponse> {
    try {
      const bulkEpisodes: Array<Episode | unknown> = await Promise.all(
        episodes.map((episode) => Episode.create(episode))
      );
      return { success: true, count: bulkEpisodes.length };
    } catch (error) {
      console.error(error);
      return { success: false, error: error as Error };
    }
  }

  static async getAll(): Promise<Episode[] | unknown> {
    try {
      const { rows } = await pool.query(`
            SELECT
            id,
            episode_number,
            title,
            season,
            release_date
            FROM episodes
          `);
      return rows.map(
        (row: DatabaseEpisode) =>
          new Episode({
            ...row,
            transcript: `Use Episode.getById(${row.id}) or Episode.getByEpisodeNumber(${row.episode_number}) for transcript`,
          })
      );
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async getById(id: string): Promise<Episode | unknown> {
    try {
      const { rows } = await pool.query('SELECT * FROM episodes WHERE id=$1', [
        id,
      ]);
      return new Episode(rows[0]);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async getByEpisodeNumber(
    episodeNumber: number
  ): Promise<Episode | unknown> {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM episodes WHERE episode_number=$1',
        [episodeNumber]
      );
      return new Episode(rows[0]);
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

export default Episode;
