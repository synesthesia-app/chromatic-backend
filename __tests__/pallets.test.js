const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('chromatic backend pallets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  const colorObjArr = [
    {
      name: 'reddish',
      hue: '0',
      sat: '100',
      light: '50',
      tone: 'c4',
    },
    {
      name: 'geenish',
      hue: '180',
      sat: '100',
      light: '50',
      tone: 'g4',
    },
  ];

  const colorObjJson = JSON.stringify(colorObjArr);

  const expected = {
    id: expect.any(String),
    userId: expect.any(String),
    name: 'summer',
    swatchArr: colorObjJson,
  };

  it('should save an array of palette(s)', async () => {
    const res = await request(app)
      .post('/api/v1/palettes')
      .send({ name: 'summer', swatchArr: colorObjJson, userId: 1 });

    expect(res.body).toEqual(expected);
  });
});
