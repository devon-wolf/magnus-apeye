import setup from '../lib/database/setup';
import pool from '../lib/database/pool';
import {
  readRawFile,
  getAssetNames,
  readAllAssets,
  readAllFilesByName,
  mungeEpisode,
} from '../lib/ingestion/ingestMarkdown';

describe('data ingestion unit tests', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  it('reads the contents of a file', async () => {
    const expected = '# TEST' + '\n' + 'This is a testfile';

    const actual = await readRawFile('testfile.md');

    expect(actual).toEqual(expected);
  });
});
