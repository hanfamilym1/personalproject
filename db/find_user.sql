select * from users u 
join user_wpr uw on uw.user_id = u.id
where auth_id = $1