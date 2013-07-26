drop database batchhelper;
create database if not exists batchhelper default charset utf8 collate utf8_general_ci;

create table timer_to_be_sent_statuses (
  id int not null auto_increment,
  user_id varchar(20) not null,
  status_text varchar(288) not null,
  status_picture_name varchar(100),
  status_picture_path varchar(150),
  status_datetime datetime not null,
  access_token varchar(64) not null,
  primary key (id)
);

create table timer_sent_statuses (
  id int not null auto_increment,
  user_id varchar(20) not null,
  status_id varchar(40) not null,
  status_text varchar(288) not null,
  status_picture_name varchar(100),
  status_picture_path varchar(150),
  status_datetime datetime not null,
  primary key (id)
);

create table timer_sent_statuses_logs (
  id int not null auto_increment,
  message varchar(200) not null,
  created_datetime datetime not null,
  primary key (id)
);

insert into timer_to_be_sent_statuses (user_id, status_text, status_picture_name, status_picture_path, status_datetime, access_token)
values ('3042520825', 'status_text', 'a.jpg', 'upload/a.jpg', '2008-08-08 22:28:44', '2.00XeGu_DoQdSfD46b1776b20nIWTCD')

select id, status_text, status_picture_name, status_picture_path, status_datetime from timer_to_be_sent_statuses
where user_id = '3042520825'

delete from timer_to_be_sent_statuses where id = 1

update timer_to_be_sent_statuses 
set user_id = '3042520825', status_text = 'status_text', status_picture_name = 'a.jpg', status_picture_path = 'upload/a.jpg', status_datetime = '2008-08-08 22:28:44'
where id = 1

insert into timer_sent_statuses (user_id, status_id, status_text, status_picture_name, status_picture_path, status_datetime)
values ('3042520825', '3507495039867497', 'status_text', 'a.jpg', 'upload/a.jpg', '2008-08-08 22:28:44')

select id, status_id, status_text, status_picture_name, status_picture_path, status_datetime from timer_sent_statuses
where user_id = '3042520825'

delete from timer_sent_statuses where id = 1

//cron
select id, user_id, status_text, status_picture_name, status_picture_path, access_token from timer_to_be_sent_statuses
where date_format(now(), '%Y-%m-%d %H:%i') = date_format(status_datetime, '%Y-%m-%d %H:%i')

insert into timer_sent_statuses_logs (message, created_datetime)
values ('sent_statuses, successful 32, failed 18.', now())

select count(*) as num from timer_to_be_sent_statuses where status_picture_path like '%a.jpg'