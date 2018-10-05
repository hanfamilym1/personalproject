insert into user_wpr (user_id, wpr_id)
values ($1, $2);
select * from users u
join user_wpr uw on u.id = uw.user_id
where user_id = $1