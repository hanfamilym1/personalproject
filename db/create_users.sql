create table users (
    id serial primary key,
    auth_id text,
    name varchar(100),
    admin boolean
)