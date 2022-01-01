import { BulkCreateResponse, DatabaseEpisode, EpisodeInput } from '../../types';
import pool from '../database/pool';
import { seedEpisodesIntoDb } from '../ingestion/ingestMarkdown';
import { marked } from 'marked';

class Episode {
  id: string;
  episodeNumber: number;
  title: string;
  season: number;
  releaseDate: Date;
  official: boolean;
  transcript: string;

  constructor({
    id,
    episode_number,
    title,
    season,
    release_date,
    official,
    transcript,
  }: DatabaseEpisode) {
    this.id = id;
    this.episodeNumber = episode_number;
    this.title = title;
    this.season = season;
    this.releaseDate = release_date;
    this.official = official;
    this.transcript = transcript;
  }

  private static shapeInput(rawTranscript: string): EpisodeInput {
    const splitFileContents = rawTranscript.split('---\n\n');
    const metadata = splitFileContents[0];
    const transcript = marked
      .parse(splitFileContents[1], { headerIds: false })
      .split('\n')
      .join('');

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

    const official = metadata.split('official:')[1].trim().startsWith('true');

    return {
      episodeNumber,
      season,
      title,
      releaseDate,
      official,
      transcript,
    };
  }

  static async triggerSeed(): Promise<void> {
    try {
      console.log('Database seeding triggered...');
      await seedEpisodesIntoDb();
      console.log('Database seeding complete.');
    } catch (error) {
      console.error(error);
    }
  }

  static async create(rawEpisode: string): Promise<Episode | unknown> {
    const input: EpisodeInput = this.shapeInput(rawEpisode);
    const { episodeNumber, title, season, releaseDate, official, transcript } =
      input;
    try {
      const { rows } = await pool.query(
        `
            INSERT INTO episodes (episode_number, title, season, release_date, official, transcript)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `,
        [episodeNumber, title, season, releaseDate, official, transcript]
      );
      return new Episode(rows[0]);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  static async bulkCreate(episodes: string[]): Promise<BulkCreateResponse> {
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
            release_date,
            official
            FROM episodes
          `);
      return rows.map(
        (row: DatabaseEpisode) =>
          new Episode({
            ...row,
            transcript: `GET /episodes/${row.episode_number} for transcript`,
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
