const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('chromatic-backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect to github oauth page upon login', async () => {
    const res = await request(app).get('/api/v1/github/login');

    expect(res.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=https:\/\/chromatic-backend.herokuapp.com\/api\/v1\/github\/login\/callback/i
    );
  });

  it.only('should login and test callback endpoint', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    expect(res.req.path).toEqual('/main');
  });

  it('logs a user out/deletes the session cookie', async () => {
    const agent = request.agent(app);
    const res = await agent.delete('/api/v1/github');
    const expected = {
      message: 'Signed out successfully',
      success: true,
    };

    expect(res.body).toEqual(expected);
  });

  it('returns a list of users', async () => {
    const agent = request.agent(app);
    const res = await agent.get('/api/v1/github/users');

    expect(res.body).toEqual([
      {
        id: '1',
        email: 'mock@email.com',
        username: 'mockUser',
      },
      {
        id: '2',
        email: 'bob@email.com',
        username: 'BobBob',
      },
    ]);
  });
});
