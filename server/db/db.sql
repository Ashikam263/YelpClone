CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(
        rating >= 1
        and rating <= 5
    )
);
SELECT *
FROM restaurants
LEFT JOIN (
    SELECT restaurant_id,
           COUNT(*),
           TRUNC(AVG(rating), 1) AS average_rating
    FROM reviews
    GROUP BY restaurant_id
) reviews ON restaurants.id = reviews.restaurant_id;
