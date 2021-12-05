DROP TABLE IF EXISTS episodes;

CREATE TABLE episodes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    episode_number INT NOT NULL,
    title TEXT NOT NULL,
    season INT NOT NULL,
    transcript TEXT NOT NULL,
    release_date DATE NOT NULL
);
