const { Router } = require('express');
const { sign } = require('../utils/jwt');
const UserService = require('../services/UserService');
const User = require('../models/GithubUser');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=http://localhost:7890/api/v1/github/login/callback`
    );
  })

  .get('/login/callback', async (req, res, next) => {
    try {
      const user = await UserService.create(req.query.code);

      const payload = sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: '1 day'
      });

      res
        .cookie(process.env.COOKIE_NAME, payload, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .redirect('/api/v1/github/users');

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
  });

