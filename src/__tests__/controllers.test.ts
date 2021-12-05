import setup from '../data/setup';
import pool from '../lib/utils/pool';
import request from 'supertest';
import app from '../lib/app';

describe('Episodes controller', () => {
  beforeEach(async () => {
    await setup(pool);
  });
  it('responds to a request', async () => {
    const response = await request(app).get('/');

    expect(response).toBeTruthy();
  });
});
