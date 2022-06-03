const { Router } = require('express');
const { sign } = require('../utils/jwt');
const UserService = require('../services/UserService');
const User = require('../models/GithubUser');
const authenticate = require('../middleware/authenticate');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const IS_DEPLOYED = process.env.NODE_ENV === 'production';

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.API_URL}/api/v1/github/login/callback`
    );
  })

  .get('/login/callback', async (req, res, next) => {
    try {
      const user = await UserService.create(req.query.code);
      const payload = sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      res
        .cookie(process.env.COOKIE_NAME, payload, {
          httpOnly: true,
          secure: IS_DEPLOYED,
          sameSite: IS_DEPLOYED ? 'none' : 'strict',
          maxAge: ONE_DAY_IN_MS,
        })
        .redirect(`${process.env.FRONTEND_URL}/main`);
    } catch (error) {
      console.log('|res', error);
      next(error);
    }
  })

  .get('/users', async (req, res, next) => {
    try {
      const users = await User.getAll();

      res.send(users);
    } catch (error) {
      next(error);
    }
  })

  .get('/me', authenticate, (req, res) => {
    res.send(req.user);
  })

  // sign out / delete cookie
  .delete('/', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME, {
        httpOnly: true,
        sameSite: IS_DEPLOYED ? 'none' : 'strict',
        secure: IS_DEPLOYED,
      })
      .json({ message: 'Signed out successfully', success: true });
  });
