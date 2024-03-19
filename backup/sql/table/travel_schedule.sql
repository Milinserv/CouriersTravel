CREATE TABLE travel_schedule
(
    id             INT PRIMARY KEY,
    courier_id     INT,
    region_id      INT,
    departure_date DATE,
    FOREIGN KEY (courier_id) REFERENCES couriers (id),
    FOREIGN KEY (region_id) REFERENCES regions (id)
);
