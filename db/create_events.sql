create table events(
id serial primary key,
user_id int references users(id),
endtime text,
starttime text,
title text)