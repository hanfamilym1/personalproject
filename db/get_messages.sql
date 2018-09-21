-- select * from users u 
-- join user_wpr uw on u.id = uw.user_id
-- join messages m on m.wpr_id = uw.wpr_id
select * from messages m
join users u on u.id = m.user_id
where wpr_id = $1
order by time