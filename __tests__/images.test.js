const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Image = require('../lib/models/Image');

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
    const expected = [
      {
        imageName: 'avatar',
        publicId: 'BJIEJDKNE',
      },
      {
        imageName: '2nd image',
        publicId: 'DBUIEBDJEO',
      },
    ];

    const res = await request(app)
      //get images from user with id 1
      .get('/api/v1/images/1');

    expect(res.body).toEqual(expected);
  });

  it('creates an image name entry', async () => {
    const expected = { imageName: 'fake', publicId: 'hudeownde', userId: '2' };

    const res = await request(app)
      .post('/api/v1/images')
      .send({ imageName: 'fake', publicId: 'hudeownde', userId: '2' });

    expect(res.body).toEqual(expected);
  });

  it('deletes an image by name', async () => {
    const expected = {
      imageName: '3rd image',
      publicId: 'BDJIEWBDJEVRFV',
      userId: '2',
    };

    const res = await request(app).delete('/api/v1/images/3rd image');

    expect(res.body).toEqual(expected);
  });

  it.only('gets a count of all images', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    const allImages = await Image.getAllImages();

    const res = await agent.get('/api/v1/images/count');
    // const res = await request(app)
    //   .get('/api/v1/images/count');

    console.log('|res!!', res);
    
    expect(res.body).toEqual(allImages);
    // expect(res.body.length).toEqual(allImages.length);
    // expect(Number(res.text)).toEqual(allImages.length);

  });
});
