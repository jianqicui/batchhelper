drop database batchhelper;
create database if not exists batchhelper default charset utf8 collate utf8_general_ci;

//timer
create table timer_tobesent_statuses (
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

insert into timer_tobesent_statuses (user_id, status_text, status_picture_name, status_picture_path, status_datetime, access_token)
values ('3042520825', 'status_text', 'a.jpg', 'upload/a.jpg', '2008-08-08 22:28:44', '2.00XeGu_DoQdSfD46b1776b20nIWTCD')

select id, status_text, status_picture_name, status_picture_path, status_datetime from timer_tobesent_statuses
where user_id = '3042520825'

delete from timer_tobesent_statuses where id = 1

update timer_tobesent_statuses 
set user_id = '3042520825', status_text = 'status_text', status_picture_name = 'a.jpg', status_picture_path = 'upload/a.jpg', status_datetime = '2008-08-08 22:28:44'
where id = 1

insert into timer_sent_statuses (user_id, status_id, status_text, status_picture_name, status_picture_path, status_datetime)
values ('3042520825', '3507495039867497', 'status_text', 'a.jpg', 'upload/a.jpg', '2008-08-08 22:28:44')

select id, status_id, status_text, status_picture_name, status_picture_path, status_datetime from timer_sent_statuses
where user_id = '3042520825'

delete from timer_sent_statuses where id = 1

//content lib
create table contentlib_types (
	id int not null auto_increment,
	code int not null,
	name varchar(10) not null,
	status_index int not null,
	primary key (id)
);

insert into contentlib_types (code, name, status_index) values 
(1, '经典语录', 0),
(2, '影视世界', 0),
(3, '幽默搞笑', 0),
(4, '奇闻异事', 0),
(5, '星座物语', 0),
(6, '生活百科', 0),
(7, '游戏天下', 0),
(8, '汽车之家', 0),
(9, '美食工厂', 0),
(10, '亲子乐园', 0),
(11, '创意无限', 0),
(12, '时尚潮流', 0),
(13, '时尚家居', 0),
(14, '萌宠动物', 0),
(15, '心理测试', 0),
(16, '职场人生', 0),
(17, '风景旅行', 0),
(18, '小说故事', 0),
(19, '内涵漫画', 0),
(20, '移动终端', 0);

create table contentlib_type1_statuses (
	id int not null auto_increment,
	status_text varchar(288) not null,
	status_picture_path varchar(150),
	primary key (id)
);

create table contentlib_type2_statuses (
	id int not null auto_increment,
	status_text varchar(288) not null,
	status_picture_path varchar(150),
	primary key (id)
);

create table contentlib_type3_statuses (
	id int not null auto_increment,
	status_text varchar(288) not null,
	status_picture_path varchar(150),
	primary key (id)
);

create table contentlib_type4_statuses (
	id int not null auto_increment,
	status_text varchar(288) not null,
	status_picture_path varchar(150),
	primary key (id)
);

create table contentlib_type5_statuses (
	id int not null auto_increment,
	status_text varchar(288) not null,
	status_picture_path varchar(150),
	primary key (id)
);

create table contentlib_type6_statuses (
	id int not null auto_increment,
	status_text varchar(288) not null,
	status_picture_path varchar(150),
	primary key (id)
);

create table contentlib_type7_statuses (
	id int not null auto_increment,
	status_text varchar(288) not null,
	status_picture_path varchar(150),
	primary key (id)
);

create table contentlib_type8_statuses (
	id int not null auto_increment,
	status_text varchar(288) not null,
	status_picture_path varchar(150),
	primary key (id)
);

create table contentlib_type9_statuses (
	id int not null auto_increment,
	status_text varchar(288) not null,
	status_picture_path varchar(150),
	primary key (id)
);

create table contentlib_type10_statuses (
	id int not null auto_increment,
	status_text varchar(288) not null,
	status_picture_path varchar(150),
	primary key (id)
);

create table contentlib_type11_statuses (
	id int not null auto_increment,
	status_text varchar(288) not null,
	status_picture_path varchar(150),
	primary key (id)
);

create table contentlib_type12_statuses (
	id int not null auto_increment,
	status_text varchar(288) not null,
	status_picture_path varchar(150),
	primary key (id)
);

create table contentlib_type13_statuses (
	id int not null auto_increment,
	status_text varchar(288) not null,
	status_picture_path varchar(150),
	primary key (id)
);

create table contentlib_type14_statuses (
	id int not null auto_increment,
	status_text varchar(288) not null,
	status_picture_path varchar(150),
	primary key (id)
);

create table contentlib_type15_statuses (
	id int not null auto_increment,
	status_text varchar(288) not null,
	status_picture_path varchar(150),
	primary key (id)
);

create table contentlib_type16_statuses (
	id int not null auto_increment,
	status_text varchar(288) not null,
	status_picture_path varchar(150),
	primary key (id)
);

create table contentlib_type17_statuses (
	id int not null auto_increment,
	status_text varchar(288) not null,
	status_picture_path varchar(150),
	primary key (id)
);

create table contentlib_type18_statuses (
	id int not null auto_increment,
	status_text varchar(288) not null,
	status_picture_path varchar(150),
	primary key (id)
);

create table contentlib_type19_statuses (
	id int not null auto_increment,
	status_text varchar(288) not null,
	status_picture_path varchar(150),
	primary key (id)
);

create table contentlib_type20_statuses (
	id int not null auto_increment,
	status_text varchar(288) not null,
	status_picture_path varchar(150),
	primary key (id)
);

//cron
select id, user_id, status_text, status_picture_name, status_picture_path, access_token from timer_tobesent_statuses
where date_format(now(), '%Y-%m-%d %H:%i') = date_format(status_datetime, '%Y-%m-%d %H:%i')

select count(*) as num from timer_tobesent_statuses where status_picture_path like '%a.jpg'
