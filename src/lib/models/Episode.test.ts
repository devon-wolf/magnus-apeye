import setup from '../database/setup';
import Episode from './Episode';
import pool from '../database/pool';
import {
  transcriptOne,
  transcriptThree,
  transcriptTwo,
} from '../../constants/test-data/expectedTranscripts';
import {
  episodeOne,
  episodeTwo,
  episodeThree,
} from '../../constants/test-data/expectedEpisodes';

// TODO fix dates

describe('Episode model', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  it('exists', () => {
    expect(Episode).toBeTruthy();
  });

  it('creates a new episode in the db', async () => {
    const expected = {
      ...episodeOne,
      id: expect.any(String),
      releaseDate: expect.any(Date),
    };
    const actual = await Episode.create(transcriptOne);
    expect(actual).toEqual(expected);
  });

  it('creates episodes in bulk', async () => {
    const expected = { success: true, count: 3 };
    const actual = await Episode.bulkCreate([
      transcriptOne,
      transcriptTwo,
      transcriptThree,
    ]);
    expect(actual).toEqual(expected);
  });

  it('gets a count of all episodes', async () => {
    const expected = { count: expect.any(String) };
    const actual = await Episode.getEpisodeCount();
    expect(actual).toEqual(expected);
  });

  it('gets all episodes', async () => {
    const expected = [
      {
        ...episodeOne,
        id: '1',
        releaseDate: expect.any(Date),
        transcript: `GET /episodes/1 for transcript`,
      },
      {
        ...episodeTwo,
        id: '2',
        releaseDate: expect.any(Date),
        transcript: `GET /episodes/2 for transcript`,
      },
      {
        ...episodeThree,
        id: '3',
        releaseDate: expect.any(Date),
        transcript: `GET /episodes/3 for transcript`,
      },
    ];

    await Episode.bulkCreate([transcriptOne, transcriptTwo, transcriptThree]);
    const actual = await Episode.getAll();
    expect(actual).toEqual(expected);
  });

  it('gets an episode by its id', async () => {
    const episode = (await Episode.create(transcriptOne)) as Episode;
    const expected = {
      ...episodeOne,
      id: episode.id,
      releaseDate: expect.any(Date),
    };
    const actual = await Episode.getById(episode.id);
    expect(actual).toEqual(expected);
  });

  it('gets an episode by episode number', async () => {
    const expected = {
      ...episodeTwo,
      id: expect.any(String),
      releaseDate: expect.any(Date),
    };
    await Episode.bulkCreate([transcriptOne, transcriptTwo, transcriptThree]);
    const actual = await Episode.getByEpisodeNumber(2);
    expect(actual).toEqual(expected);
  });
});
