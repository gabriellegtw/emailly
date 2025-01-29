CREATE DATABASE emailly

CREATE TABLE users(
    -- Primary Key is unique. Serial automatically increments the number
    user_id SERIAL PRIMARY KEY,
    -- VARCHAR means that it does not ncessarily have to be of the defined length
    -- CHAR means that all values would be of the specified length
    email VARCHAR(320) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);