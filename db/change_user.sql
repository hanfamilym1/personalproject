update user_wpr
set wpr_id = $1
where user_id = $2;
select * from users u
join user_wpr uw on u.id = uw.user_id