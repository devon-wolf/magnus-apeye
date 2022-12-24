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
    const { transcript: transcriptOne, ...restOne } = episodeOne;
    const { transcript: transcriptTwo, ...restTwo } = episodeTwo;
    const { transcript: transcriptThree, ...restThree } = episodeThree;
    const expected = {
      count: 3,
      description: GET_EPISODES,
      data: [
        {
          ...restOne,
          releaseDate: expect.any(Date),
          transcriptPath: `/episodes/1`,
          id: '2016-03-23-001',
        },
        {
          ...restTwo,
          releaseDate: expect.any(Date),
          transcriptPath: `/episodes/2`,
          id: '2016-03-25-002',
        },
        {
          ...restThree,
          releaseDate: expect.any(Date),
          transcriptPath: `/episodes/3`,
          id: '2016-03-27-003',
        },
      ],
    };

    const actual = testCollection.getAll();
    expect(actual).toEqual(expected);
  });

  it('gets an episode by its episode number', async () => {
    const expected = {
      ...episodeOne,
      rawTranscript: transcriptOne.data,
      id: '2016-03-23-001',
      releaseDate: expect.any(Date),
    };
    const actual = testCollection.getByEpisodeNumber(1);
    expect(actual).toEqual(expected);
  });
});
