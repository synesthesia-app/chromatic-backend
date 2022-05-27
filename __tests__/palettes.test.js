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
      name: 'greenish',
      hue: '180',
      sat: '100',
      light: '50',
      tone: 'g4',
    },
  ];

  const updateColorObjArr = [
    {
      name: 'bright red',
      hue: '0',
      sat: '100',
      light: '60',
      tone: 'c4',
    },
    {
      name: 'greenish',
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
  it('should update a palette', async () => {
    await request(app)
      .post('/api/v1/palettes')
      .send({ name: 'summer', swatchArr: colorObjJson, userId: 1 });
    const res = await request(app)
      .put('/api/v1/palettes/1')
      .send({
        name: 'summer',
        swatchArr: JSON.stringify(updateColorObjArr),
        userId: 1,
      });

    const expected = {
      id: expect.any(String),
      userId: expect.any(String),
      name: 'summer',
      swatchArr: JSON.stringify(updateColorObjArr),
    };

    expect(res.body).toEqual(expected);
  });
  it('should get all palettes by userId', async () => {
    const palette = await request(app)
      .post('/api/v1/palettes')
      .send({ name: 'summer', swatchArr: colorObjJson, userId: 1 });
    const res = await request(app).get(
      `/api/v1/palettes/user/${palette.body.userId}`
    );
    const expected = [
      {
        id: expect.any(String),
        userId: expect.any(String),
        name: 'summer',
        swatchArr: colorObjJson,
      },
    ];
    expect(res.body).toEqual(expected);
  });

  it.only('should get one palette by palette id', async () => {
    const palette = await request(app)
      .post('/api/v1/palettes')
      .send({ name: 'summer', swatchArr: colorObjJson, userId: 1 });
    console.log('palette id :>> ', palette.body.id);

    const res = await request(app).get(`/api/v1/palettes/${palette.body.id}`);

    const expected = {
      id: expect.any(String),
      userId: expect.any(String),
      name: 'summer',
      swatchArr: colorObjJson,
    };
    expect(res.body).toEqual(expected);
  });
});
