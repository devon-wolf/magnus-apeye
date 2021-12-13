import {
  readRawFile,
  getAssetNames,
  readAllAssets,
} from '../lib/ingestion/ingestMarkdown';
import {
  transcriptOne,
  transcriptTwo,
  transcriptThree,
} from '../constants/test-data/expectedTranscripts';

describe('data ingestion unit tests', () => {
  const TEST_MARKDOWN_PATH = `${__dirname}/../constants/test-markdown`;

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
    ];
    const actual = await getAssetNames(TEST_MARKDOWN_PATH);
    expect(actual).toEqual(expected);
  });

  it('returns the contents of all files in the asset directory', async () => {
    const expected = [transcriptOne, transcriptTwo, transcriptThree];
    const actual = await readAllAssets(TEST_MARKDOWN_PATH);
    expect(actual).toEqual(expected);
  });
});
