const pool = require('..utils/pool');

module.exports = class User {
  id;
  username;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
  }

  static async insert({ username }) {
    const { rows } = await pool.query(
      `
    INSERT INT0
    users(username)
    VALUES
    ($1)
    RETURNING *
    `,
      [username]
    );

    return new User(rows[0]);
  }

  static async findByUsername(username) {
    const { rows } = await pool.query(
      `
    SELECT *
    FROM users
    WHERE
    username=$1
    `,
      [username]
    );

    if (!rows[0]) return null;
    return new User(rows[0]);
  }
};
