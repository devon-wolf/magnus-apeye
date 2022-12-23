import { GET_EPISODES } from '../../constants/constants';
import {
  episodeOne,
  episodeThree,
  episodeTwo,
} from '../../constants/test-data/expectedEpisodes';
import {
  transcriptOne,
  transcriptThree,
  transcriptTwo,
} from '../../constants/test-data/expectedTranscripts';
import EpisodeCollection from './EpisodeCollection';

describe('Episode collection model', () => {
  const testCollection = new EpisodeCollection([
    transcriptOne,
    transcriptTwo,
    transcriptThree,
  ]);

  it('gets a count of all episodes', async () => {
    const expected = 3;
    const actual = testCollection.getEpisodeCount();
    expect(actual).toEqual(expected);
  });

  it('gets all episodes', async () => {
    const expected = {
      count: 3,
      description: GET_EPISODES,
      data: [
        {
          ...episodeOne,
          releaseDate: expect.any(Date),
          transcript: `GET /episodes/1 for transcript`,
          rawTranscript: `GET /episodes/1 for transcript`,
        },
        {
          ...episodeTwo,
          releaseDate: expect.any(Date),
          transcript: `GET /episodes/2 for transcript`,
          rawTranscript: `GET /episodes/2 for transcript`,
        },
        {
          ...episodeThree,
          releaseDate: expect.any(Date),
          transcript: `GET /episodes/3 for transcript`,
          rawTranscript: `GET /episodes/3 for transcript`,
        },
      ],
    };

    const actual = testCollection.getAll();
    expect(actual).toEqual(expected);
  });

  it('gets an episode by its episode number', async () => {
    const expected = {
      ...episodeOne,
      rawTranscript: transcriptOne,
      releaseDate: expect.any(Date),
    };
    const actual = testCollection.getByEpisodeNumber(1);
    expect(actual).toEqual(expected);
  });
});
