insert into messages (message, user_id, wpr_id, time)
values ($1, $2, $3, now());
select * from messages m
join users u on u.id = m.user_id
where wpr_id = $3
order by time

