CREATE TABLE available_towns(
    id SERIAL NOT NULL PRIMARY KEY,
    town TEXT NOT NULL,
    reg_code TEXT NOT NULL
);
CREATE TABLE registration_numbers(
    id SERIAL NOT NULL PRIMARY KEY,
    registration TEXT NOT NULL,
    town_entered TEXT NOT NULL,
    FOREIGN KEY (town_entered) REFERENCES available_towns(id)
);
INSERT INTO available_towns (town, reg_code) VALUES ('Cape Town', 'CA');
INSERT INTO available_towns (town, reg_code) VALUES ('Stellenbosch', 'CL');
INSERT INTO available_towns (town, reg_code) VALUES ('Paarl', 'CJ');
