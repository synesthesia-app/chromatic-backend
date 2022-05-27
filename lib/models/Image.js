const pool = require('../utils/pool');

module.exports = class Image {
  id;
  imageName;
  userID;

  constructor(row) {
    this.id = row.id;
    this.imageName = row.image_name;
    this.userId = row.user_id;
  }

  static async getByUserId(userId) {
    const { rows } = await pool.query(
      `
      SELECT
        image_name
      FROM
        images
      WHERE
        user_id=$1
      `,
      [userId]
    );

    if (!rows[0]) return null;
    // return new Image(rows[0]);
    console.log('rows[0]', rows[0]);
    return rows.map((row) => {
      const newImage = new Image(row);
      return newImage.imageName;
    });



  }




};
