import {
  readRawFile,
  getAssetNames,
  readAllAssets,
  mungeEpisode,
} from '../lib/ingestion/ingestMarkdown';
import {
  transcriptOne,
  transcriptTwo,
  transcriptThree,
} from '../constants/test-data/expectedTranscripts';
import { EpisodeInput } from '../types';

describe('data ingestion unit tests', () => {
  it('reads the contents of a file', async () => {
    const expected = transcriptOne;
    const actual = await readRawFile(
      '2016-03-23-001.md',
      `${__dirname}/../constants/test-markdown`
    );
    expect(actual).toEqual(expected);
  });

  it('gets the names of the files in the target directory', async () => {
    const expected = [
      '2016-03-23-001.md',
      '2016-03-25-002.md',
      '2016-03-27-003.md',
    ];
    const actual = await getAssetNames(
      `${__dirname}/../constants/test-markdown`
    );
    expect(actual).toEqual(expected);
  });

  it('returns the contents of all files in the asset directory', async () => {
    const expected = [transcriptOne, transcriptTwo, transcriptThree];
    const actual = await readAllAssets(
      `${__dirname}/../constants/test-markdown`
    );
    expect(actual).toEqual(expected);
  });

  it('shapes raw string contents into an episode input object', () => {
    const expected: EpisodeInput = {
      episodeNumber: 3,
      title: 'Across the Street',
      season: 1,
      releaseDate: expect.any(Date),
      transcript:
        '##### [CLICK]' +
        '\n\n' +
        '#### ARCHIVIST' +
        '\n\n' +
        'Statement of Amy Patel, regarding the alleged disappearance of her acquaintance Graham Folger. Original statement given July 1st, 2007. Audio recording by Jonathan Sims, Head Archivist of the Magnus Institute, London.' +
        '\n\n' +
        'Statement begins.' +
        '\n\n' +
        '_transcript truncated for test_' +
        '\n\n' +
        'Recording ends.' +
        '\n\n' +
        '##### [CLICK]',
    };
    const actual = mungeEpisode(transcriptThree);
    expect(actual).toEqual(expected);
  });
});