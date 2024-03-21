INSERT INTO travel_schedule (courier_id, region_id, departure_date)
SELECT
       c.id AS courier_id,
       r.id AS region_id,
       DATE_ADD(CURDATE(), INTERVAL (r.count_days_way * (SELECT COUNT(*) FROM couriers)) DAY) AS departure_date
FROM couriers c, regions r;
