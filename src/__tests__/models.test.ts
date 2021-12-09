import setup from '../lib/database/setup';
import Episode from '../lib/models/Episode';
import pool from '../lib/database/pool';

describe('Episode model', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  it('exists', () => {
    expect(Episode).toBeTruthy();
  });

  // TODO fix dates
  const episodeOne = {
    episodeNumber: 1,
    title: 'Anglerfish',
    season: 1,
    transcript: 'Statement begins...',
    releaseDate: new Date('2016-03-23'),
  };

  const episodeTwo = {
    episodeNumber: 2,
    title: 'Do Not Open',
    season: 1,
    transcript: 'Statement begins...',
    releaseDate: new Date('2016-03-25'),
  };

  it('creates a new episode in the db', async () => {
    const expected = {
      ...episodeOne,
      id: expect.any(String),
      releaseDate: expect.any(Date),
    };
    const actual = await Episode.create(episodeOne);

    expect(actual).toEqual(expected);
  });

  it('creates episodes in bulk', async () => {
    const expected = { success: true, count: 2 };
    const actual = await Episode.ingest([episodeOne, episodeTwo]);
    expect(actual).toEqual(expected);
  });

  it('gets all episodes', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { transcript: transcriptOne, ...restOne } = episodeOne;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { transcript: transcriptTwo, ...restTwo } = episodeTwo;

    const expected = [
      { ...restOne, id: expect.any(String), releaseDate: expect.any(Date) },
      { ...restTwo, id: expect.any(String), releaseDate: expect.any(Date) },
    ];

    await Episode.ingest([episodeOne, episodeTwo]);

    const actual = await Episode.getAll();

    expect(actual).toEqual(expected);
  });

  it('gets an episode by its id', async () => {
    const episode = (await Episode.create(episodeOne)) as Episode;
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
    
    await Episode.ingest([episodeOne, episodeTwo]);

    const actual = await Episode.getByEpisodeNumber(2);

    expect(actual).toEqual(expected);
  })
});
