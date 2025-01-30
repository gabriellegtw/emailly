CREATE DATABASE emailly

CREATE TABLE users(
    -- Primary Key is unique. Serial automatically increments the number
    user_id SERIAL PRIMARY KEY,
    -- VARCHAR means that it does not ncessarily have to be of the defined length
    -- CHAR means that all values would be of the specified length
    email VARCHAR(320) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE emails(
    email_id SERIAL PRIMARY KEY,
    user_email VARCHAR(320) NOT NULL,  -- Column to store the user's email
    content TEXT NOT NULL,  -- Assuming you want to store the email content
    FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE  -- Set up foreign key constraint, establishes a relation between the tables
    -- ON DELETE CASCADE means that if user is deleted, emails is also deleted
);

ALTER TABLE emails
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE emails
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;