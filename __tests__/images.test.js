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







});