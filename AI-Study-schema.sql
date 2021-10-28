CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL CHECK (position('@' IN email) > 1)
);

CREATE TABLE todo (
  id SERIAL PRIMARY KEY,
  note TEXT NOT NULL,
  user_name TEXT REFERENCES users ON DELETE CASCADE
);

CREATE TABLE flashcards (
  title VARCHAR(100) PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  tag TEXT NOT NULL,
  user_name TEXT REFERENCES users ON DELETE CASCADE
);

