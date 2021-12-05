import setup from '../data/setup';
import EpisodeServices from '../lib/services/EpisodeServices';
import pool from '../lib/utils/pool';

describe('Episode services', () => {
  beforeEach(async () => {
    await setup(pool);
  });
  it('exists', () => {
    expect(EpisodeServices).toBeTruthy();
  });
});
