const pool = require('../utils/pool');

module.exports = class Image {
  id;
  imageName;
  userId;
  publicId;

  constructor(row) {
    this.id = row.id;
    this.imageName = row.image_name;
    this.userId = row.user_id;
    this.publicId = row.public_id;
  }

  static async getByUserId(userId) {
    const { rows } = await pool.query(
      `
      SELECT
        image_name, public_id
      FROM
        images
      WHERE
        user_id=$1
      `,
      [userId]
    );

    if (!rows[0]) return null;
    return rows.map((row) => new Image(row));
  }

  static async insert({ imageName, publicId, userId }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        images (image_name, public_id, user_id)
      VALUES
        ($1, $2, $3)
      RETURNING
        image_name, public_id, user_id
      `,
      [imageName, publicId, userId]
    );

    if (!rows[0]) return null;

    return new Image(rows[0]);
  }

  static async delete(imageName) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        images
      WHERE
        image_name=$1
      RETURNING
        image_name, public_id, user_id
      `,
      [imageName]
    );

    if (!rows[0]) return null;
    return new Image(rows[0]);
  }
};
