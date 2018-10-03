delete from users   
where id = $1;
select * from users u
join user_wpr uw on u.id = uw.user_id