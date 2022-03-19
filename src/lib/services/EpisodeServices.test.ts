import setup from '../database/setup';
import EpisodeServices from './EpisodeServices';
import pool from '../database/pool';

describe('Episode services', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  it('exists', () => {
    expect(EpisodeServices).toBeTruthy();
  });
});
