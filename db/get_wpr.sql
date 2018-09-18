select * from user_wpr
join users on users.id = user_wpr.user_id
where wpr_id = 41
