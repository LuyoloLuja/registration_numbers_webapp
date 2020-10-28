CREATE TABLE available_towns(
    id SERIAL NOT NULL PRIMARY KEY,
    town TEXT NOT NULL,
)

CREATE TABLE registration_numbers(
    id SERIAL NOT NULL PRIMARY KEY,
    registration TEXT NOT NULL,
    which_town TEXT NOT NULL,
    FOREIGN KEY (which_town) REFERENCES registration_numbers(id)
)

INSERT INTO registration_numbers (town, registration) VALUES ('Cape TOWN', 'CA');
INSERT INTO registration_numbers (town, registration) VALUES ('Stellenbosch', 'CL');
INSERT INTO registration_numbers (town, registration) VALUES ('Paarl', 'CJ');