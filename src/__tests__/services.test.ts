import setup from '../lib/database/setup';
import EpisodeServices from '../lib/services/EpisodeServices';
import pool from '../lib/database/pool';

describe('Episode services', () => {
  beforeEach(async () => {
    await setup(pool);
  });
  it('exists', () => {
    expect(EpisodeServices).toBeTruthy();
  });
});
