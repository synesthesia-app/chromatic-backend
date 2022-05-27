const { Router } = require('express');
const Image = require('../models/Image');

module.exports = Router()
  .get('/:userId', async (req, res) => {

    const images = await Image.getByUserId(req.params.userId);

    res.send(images);
  });