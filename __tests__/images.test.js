const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('image route tests', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('get all images associated with user ID', async () => {
    // const expected = [
    //   { imageName: 'avatar' },
    //   { imageName: '2nd image' }
    // ];
    const expected = ['avatar', '2nd image'];

    const res = await request(app)
      //get images from user with id 1
      .get('/api/v1/images/1');

    expect(res.body).toEqual(expected);
  });

  it('creates an image name entry', async () => {
    const expected = { imageName: 'fake', userId: '2' };

    const res = await request(app)
      .post('/api/v1/images')
      .send({ imageName: 'fake', userId: '2' });

    expect(res.body).toEqual(expected);
  });

  it('deletes an image by name', async () => {
    const expected = { imageName: '3rd image', userId: '2' };

    const res = await request(app).delete('/api/v1/images/3rd image');

    expect(res.body).toEqual(expected);
  });
});
