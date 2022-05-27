const { Router } = require('express');
const Palette = require('../models/Palette');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const paletteArr = await Palette.insert(req.body);

      res.json(paletteArr);
    } catch (error) {
      next(error);
    }
  })
  .put('/:paletteId', async (req, res, next) => {
    console.log('req.body :>> ', req.body);
    try {
      const paletteArr = await Palette.update(req.params.paletteId, req.body);
      res.json(paletteArr);
    } catch (error) {
      next(error);
    }
  });
