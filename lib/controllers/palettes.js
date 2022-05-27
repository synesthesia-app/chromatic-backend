const { Router } = require('express');
const Palette = require('../models/Palette');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    console.log('|| req.body >', req.body);
    const paletteArr = await Palette.insert(req.body);

    console.log('|| paletteArr >', paletteArr);

    res.json(paletteArr);
  } catch (error) {
    next(error);
  }
});
