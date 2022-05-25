-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS images CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT
);

CREATE TABLE images (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  image_name TEXT NOT NULL,
  username TEXT REFERENCES users (username)
);
