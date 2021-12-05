import pool from '../lib/database/pool';
import setup from '../lib/database/setup';
import request from 'supertest';
import app from '../lib/app';

describe('app tests', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  it('responds to a request', async () => {
    const response = await request(app).get('/');
    expect(response).toBeTruthy();
  });

  it('responds to a nonexistent endpoint with a 404 error', async () => {
    const response = await request(app).get('/not-an-implemented-endpoint');
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});
