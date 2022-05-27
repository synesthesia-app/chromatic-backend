const { Router } = require('express');
const Image = require('../models/Image');

module.exports = Router()
  .get('/:userId', async (req, res) => {

    const images = await Image.getByUserId(req.params.userId);

    res.send(images);
  })

  .post('/', async (req, res, next) => {
    try {
      const image = await Image.insert(req.body);
  
      res.send(image);
      
    } catch (error) {
      next(error);
    }

  })

  .delete('/:imageName', async (req, res, next) => {
    try {
      const image = await Image.delete(req.params.imageName);

      res.send(image);

    } catch (error) {
      next(error);
    }

  });