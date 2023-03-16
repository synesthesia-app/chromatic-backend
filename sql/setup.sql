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
  public_id TEXT NOT NULL,
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
  ('mockUser', 'mock@email.com'),
  -- ('armaBurton', 'armanarma@armaburton.com'),
  ('BobBob', 'bob@email.com');

INSERT INTO
  images (image_name, public_id, user_id)
VALUES
  ('avatar', 'BJIEJDKNE', 1),
  ('2nd image', 'DBUIEBDJEO', 1),
  ('3rd image', 'BDJIEWBDJEVRFV', 2);


  -- json.stringify each object when inserting and updating, json.parse when reading