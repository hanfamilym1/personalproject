insert into users (auth_id, name, admin)
values ($1, $2, $3)
returning *; 