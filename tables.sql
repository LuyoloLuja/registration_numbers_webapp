CREATE TABLE available_towns(
    id SERIAL  PRIMARY KEY,
    town TEXT,
    reg_code TEXT
);
CREATE TABLE registration_numbers(
    id SERIAL PRIMARY KEY,
    registration TEXT,
    town_entered INT,
    FOREIGN KEY (town_entered) REFERENCES available_towns(id)
);
INSERT INTO available_towns (town, reg_code) VALUES ('Cape Town', 'CA');
INSERT INTO available_towns (town, reg_code) VALUES ('Stellenbosch', 'CL');
INSERT INTO available_towns (town, reg_code) VALUES ('Paarl', 'CJ');
