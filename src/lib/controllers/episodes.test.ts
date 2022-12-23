import request from 'supertest';
import app from '../app';
import { GET_EPISODES } from '../../constants/constants';

describe('Episodes controller', () => {
  it('responds to a request', async () => {
    const response = await request(app).get('/episodes');
    expect(response).toBeTruthy();
  });

  it('responds with query metadata and episode array', async () => {
    const expected = {
      count: expect.any(Number),
      description: GET_EPISODES,
      data: expect.any(Array),
    };
    const response = await request(app).get('/episodes');
    const actual = response.body;
    expect(actual).toEqual(expected);
  });
});
