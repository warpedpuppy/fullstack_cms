CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    img_url TEXT,
    date_created TIMESTAMP DEFAULT now()
);

CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    img_url TEXT
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    eventname TEXT NOT NULL,
    description TEXT,
    date_of_event TIMESTAMP,
    time_start TEXT,
    time_end TEXT,
    img_url TEXT
);
