CREATE TABLE parts (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    part_name TEXT NOT NULL,
    part_description TEXT NOT NULL,
    status TEXT NOT NULL
);