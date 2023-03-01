import Episode from './Episode';
import { transcriptOne } from '../../constants/test-data/expectedTranscripts';
import { episodeOne } from '../../constants/test-data/expectedEpisodes';

describe('Episode model', () => {
  it('creates a new episode', async () => {
    const expected = {
      ...episodeOne,
      rawTranscript: transcriptOne.data,
      releaseDate: expect.any(Date),
      id: '2016-03-23-001',
    };
    const actual = new Episode(transcriptOne);
    expect(actual).toEqual(expected);
  });
});
