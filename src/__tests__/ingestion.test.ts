import {
  readRawFile,
  getAssetNames,
  readAllAssets,
  seedEpisodesIntoDb,
} from '../lib/ingestion/ingestMarkdown';
import {
  transcriptOne,
  transcriptTwo,
  transcriptThree,
  transcriptFortyTwo,
  transcriptFortyOne,
  transcriptEightyOne,
  transcriptEightyTwo,
  transcriptOneTwentyOne,
  transcriptOneTwentyTwo,
  transcriptOneSixtyOne,
  transcriptFortyThree,
  transcriptEightyThree,
  transcriptOneTwentyThree,
  transcriptOneSixtyTwo,
  transcriptOneSixtyThree,
} from '../constants/test-data/expectedTranscripts';
import setup from '../lib/database/setup';
import pool from '../lib/database/pool';

describe('data ingestion unit tests', () => {
  const TEST_MARKDOWN_PATH = `${__dirname}/../constants/test-markdown`;

  beforeEach(async () => await setup(pool));

  it('reads the contents of a file', async () => {
    const expected = transcriptOne;
    const actual = await readRawFile('2016-03-23-001.md', TEST_MARKDOWN_PATH);
    expect(actual).toEqual(expected);
  });

  it('gets the names of the files in the target directory', async () => {
    const expected = [
      '2016-03-23-001.md',
      '2016-03-25-002.md',
      '2016-03-27-003.md',
      '2016-11-30-041.md',
      '2016-12-07-042.md',
      '2016-12-14-043.md',
      '2017-11-22-081.md',
      '2017-11-29-082.md',
      '2017-12-06-083.md',
      '2019-01-09-121.md',
      '2019-01-16-122.md',
      '2019-01-23-123.md',
      '2020-04-02-161.md',
      '2020-04-09-162.md',
      '2020-04-16-163.md',
      'LICENSE.md',
    ];
    const actual = await getAssetNames(TEST_MARKDOWN_PATH);
    expect(actual).toEqual(expected);
  });

  it('returns the contents of all files in the asset directory, ignoring the license', async () => {
    const expected = [
      transcriptOne,
      transcriptTwo,
      transcriptThree,
      transcriptFortyOne,
      transcriptFortyTwo,
      transcriptFortyThree,
      transcriptEightyOne,
      transcriptEightyTwo,
      transcriptEightyThree,
      transcriptOneTwentyOne,
      transcriptOneTwentyTwo,
      transcriptOneTwentyThree,
      transcriptOneSixtyOne,
      transcriptOneSixtyTwo,
      transcriptOneSixtyThree,
    ];
    const actual = await readAllAssets(TEST_MARKDOWN_PATH);
    expect(actual).toEqual(expected);
  });

  it('seeds the contents of a directory to the database', async () => {
    const expected = { success: true, count: 15 };
    const actual = await seedEpisodesIntoDb(TEST_MARKDOWN_PATH);
    expect(actual).toEqual(expected);
  });
});
