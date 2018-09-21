select * from times
where user_id = $1
order by time desc
limit 2