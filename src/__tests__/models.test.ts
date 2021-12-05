import setup from '../lib/database/setup';
import Episode from '../lib/models/Episode';
import pool from '../lib/database/pool';

describe('Episode model', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  it('exists', () => {
    expect(Episode).toBeTruthy();
  });
});
