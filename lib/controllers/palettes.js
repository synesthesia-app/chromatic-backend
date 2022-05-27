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
    try {
      const paletteArr = await Palette.update(req.params.paletteId, req.body);
      res.json(paletteArr);
    } catch (error) {
      next(error);
    }
  })
  .get('/user/:userId', async (req, res, next) => {
    try {
      const paletteArr = await Palette.getAllByUserId(req.params.userId);
      res.json(paletteArr);
    } catch (error) {
      next(error);
    }
  })
  .get('/:paletteId', async (req, res, next) => {
    try {
      const palette = await Palette.getByPaletteId(req.params.paletteId);
      res.json(palette);
    } catch (error) {
      next(error);
    }
  });