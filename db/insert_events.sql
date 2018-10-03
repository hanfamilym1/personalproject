insert into events(user_id, endtime, starttime, title)
values ($1, $2, $3, $4);
select user_id, endtime as end, starttime as start, title from events