create table times (
id serial primary key,
user_id int references users(id),
clock_in boolean,
time timestamp without time zone)
