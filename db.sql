CREATE TABLE products1 (
  id INT,
  name VARCHAR(255),  
  price INT,
  on_sale BOOLEAN
);

CREATE TABLE restaurants(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  price_range INT NOT NULL CHECK (price_range > 0 AND price_range < 6)
);

INSERT INTO restaurants (id, name, location, price_range) values (1, 'McDonalds', 'New York', 1);