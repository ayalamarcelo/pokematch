CREATE DATABASE pokematch;
USE pokematch;

CREATE TABLE winners (
    id int auto_increment primary key,
    user VARCHAR(255) NOT NULL,
    time VARCHAR(255) NOT NULL,
    moves INT NOT NULL
);

SELECT * FROM winners;