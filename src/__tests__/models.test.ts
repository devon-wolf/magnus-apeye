import setup from '../data/setup';
import Episode from '../lib/models/Episode';
import pool from '../lib/utils/pool';

describe('Episode model', () => {
  beforeEach(async () => {
    await setup(pool);
  });
  it('exists', () => {
    expect(Episode).toBeTruthy();
  });
});
