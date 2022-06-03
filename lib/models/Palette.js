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
    if (!rows[0]) return null;

    return new Palette(rows[0]);
  }

  static async update(paletteId, { name, swatchArr }) {
    const { rows } = await pool.query(
      `
        UPDATE palettes 
        SET name=$1, swatch_arr=$2
        WHERE id=$3
        RETURNING *
      `,
      [name, swatchArr, paletteId]
    );
    if (!rows[0]) return null;
    return new Palette(rows[0]);
  }
  static async getAllByUserId(userId) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM palettes
      WHERE palettes.user_id = $1
      `,
      [userId]
    );
    if (!rows[0]) return null;
    return rows.map((row) => new Palette(row));
  }

  static async getByPaletteId(id) {
    const { rows } = await pool.query(
      `
      SELECT * 
      FROM palettes
      WHERE palettes.id = $1
      `,
      [id]
    );
    if (!rows[0]) return null;
    return new Palette(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM palettes 
      WHERE palettes.id = $1
      RETURNING *
      `,
      [id]
    );
    if (!rows[0]) return null;
    return new Palette(rows[0]);
  }
};
