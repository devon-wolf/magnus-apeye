-- parent folder (/sql) needs to be on the same directory level as /src and /dist in order to be accessible --

DROP TABLE IF EXISTS episodes;
-- DROP TABLE IF EXISTS entities;
-- DROP TABLE IF EXISTS characters;
-- DROP TABLE IF EXISTS statements;
-- DROP TABLE IF EXISTS artifacts;

CREATE TABLE episodes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    episode_number INT NOT NULL,
    title TEXT NOT NULL,
    season INT NOT NULL,
    transcript TEXT NOT NULL,
    release_date DATE NOT NULL
);

-- CREATE TABLE entities (
--     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     entity_name TEXT NOT NULL
-- );

-- CREATE TABLE characters (
--     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     character_name TEXT NOT NULL
-- );

-- CREATE TABLE statements (
--     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     statement_number INT NOT NULL,
--     statement_date DATE NOT NULL,
--     statement_giver_id REFERENCES characters(id),
--     recorded_by_id REFERENCES characters(id),
-- );

-- CREATE TABLE artifacts (
--     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     artifact_name TEXT NOT NULL
-- );
