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
      'LICENSE.md',
    ];
    const actual = await getAssetNames(TEST_MARKDOWN_PATH);
    expect(actual).toEqual(expected);
  });

  it('returns the contents of all files in the asset directory, ignoring the license', async () => {
    const expected = [transcriptOne, transcriptTwo, transcriptThree];
    const actual = await readAllAssets(TEST_MARKDOWN_PATH);
    expect(actual).toEqual(expected);
  });

  it('seeds the contents of a directory to the database', async () => {
    const expected = { success: true, count: 3 };
    const actual = await seedEpisodesIntoDb(TEST_MARKDOWN_PATH);
    expect(actual).toEqual(expected);
  });
});
