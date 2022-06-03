const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());
app.use(require('cookie-parser')());
app.use(
  require('cors')({
    origin: [
      'http://localhost:7891',
      'https://chromatic-backend.herokuapp.com',
      'https://chromatic-app.netlify.app'
    ],
    credentials: true,
  })
);

// App routes
app.use('/api/v1/github', require('./controllers/github'));
app.use('/api/v1/images', require('./controllers/images'));
app.use('/api/v1/palettes', require('./controllers/palettes'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
