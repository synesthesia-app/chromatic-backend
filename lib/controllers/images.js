const { Router } = require('express');
const Image = require('../models/Image');

module.exports = Router()
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
  })

  // .get('/count', async (req, res, next) => {
  //   try {
  //     const allImages = await Image.getAllImages();
  //     console.log('controllercount', allImages.length);
  //     res.send(allImages);
  //   } catch (error) {
  //     next(error);
  //   }
  // })
  .get('/count', async (req, res, next) => {
    try {
      const count = await Image.getCount();
      console.log('controllercount', count);
      res.send(count);
    } catch (error) {
      next(error);
    }
  })
  .get('/:userId', async (req, res) => {
    const images = await Image.getByUserId(req.params.userId);

    res.send(images);
  });
