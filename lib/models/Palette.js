const pool = require('../utils/pool');

module.exports = class Palette {
  id;
  userId;
  name;
  swatchArr;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.name = row.name;
    this.swatchArr = row.swatch_arr;
  }

  static async insert({ userId, name, swatchArr }) {
    const { rows } = await pool.query(
      `
        INSERT INTO palettes (user_id, name, swatch_arr)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [userId, name, swatchArr]
    );
    console.log('|| swatchArrg >', swatchArr);
    if (!rows[0]) return null;

    return new Palette(rows[0]);
  }
};
