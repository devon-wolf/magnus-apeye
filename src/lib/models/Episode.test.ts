import Episode from './Episode';
import { transcriptOne } from '../../constants/test-data/expectedTranscripts';
import { episodeOne } from '../../constants/test-data/expectedEpisodes';

// TODO fix dates

describe('Episode model', () => {
  it('creates a new episode', async () => {
    const expected = {
      ...episodeOne,
      rawTranscript: transcriptOne,
      releaseDate: expect.any(Date),
    };
    const actual = new Episode(transcriptOne);
    expect(actual).toEqual(expected);
  });
});
