CREATE TABLE users (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    clerk_id TEXT UNIQUE,
    name TEXT
);

CREATE TABLE calendars (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT,
    created_by INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE calendar_members (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    calendar_id INT REFERENCES calendars(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE calendar_events (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    calendar_id INT REFERENCES calendars(id) ON DELETE CASCADE,
    activity TEXT,
    location TEXT,
    event_time TIMESTAMP,
    price_per_person NUMERIC(10, 2),
    created_by INT REFERENCES users(id) ON DELETE CASCADE
);
