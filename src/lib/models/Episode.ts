import { DatabaseEpisode, EpisodeInput } from '../../types';
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
      return rows.map((row) => new Episode(row));
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
}

export default Episode;
