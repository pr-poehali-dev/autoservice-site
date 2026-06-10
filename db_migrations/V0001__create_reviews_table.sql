CREATE TABLE t_p42101459_autoservice_site.reviews (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    car VARCHAR(100),
    text TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);