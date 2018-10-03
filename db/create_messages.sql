create table messages (
    id serial primary key,
    message text,
    user_id int,
    wpr_id int,
    time timestamp without time zone not null
)