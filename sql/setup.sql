-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS images CASCADE;
DROP TABLE IF EXISTS palettes CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT
);

CREATE TABLE images (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  image_name TEXT NOT NULL,
  user_id BIGINT REFERENCES users (id)
);

CREATE TABLE palettes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT REFERENCES users (id),
  name TEXT NOT NULL,
  swatch_arr TEXT
);

INSERT INTO
  users (username, email)
VALUES
  ('mockUser', 'mock@email.com');

INSERT INTO
  images (image_name, user_id)
VALUES
  ('avatar', 1);

INSERT INTO
  palettes (name, swatch_arr, user_id)
VALUES
  ('summer', '[{"color":"red"},{"color":"orange"}]', 1);

  -- json.stringify each object when inserting and updating, json.parse when reading