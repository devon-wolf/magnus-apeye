import setup from '../lib/database/setup';
import pool from '../lib/database/pool';
import request from 'supertest';
import app from '../lib/app';
import { GET_EPISODES } from '../constants/constants';

describe('Episodes controller', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  it('responds to a request', async () => {
    const response = await request(app).get('/episodes');
    expect(response).toBeTruthy();
  });

  it('responds with query metadata and episode array', async () => {
    const expected = {
      count: expect.any(String),
      description: GET_EPISODES,
      data: expect.any(Array),
    };
    const response = await request(app).get('/episodes');
    const actual = response.body;
    console.log(actual);
    expect(actual).toEqual(expected);
  });
});
