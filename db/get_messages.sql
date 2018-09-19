select * from users u 
join user_wpr uw on u.id = uw.user_id
join messages m on m.wpr_id = uw.wpr_id
