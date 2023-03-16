const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  console.log('*** -4 -authenticate.js *** req.cookies ==> ', req.cookies);
  try {
    const { session } = req.cookies;
    const payload = jwt.verify(session, process.env.JWT_SECRET);
    req.user = payload;

    next();
  } catch (error) {
    error.message = 'You need to sign in to continue';
    error.status = 401;
    next(error);
  }
};
