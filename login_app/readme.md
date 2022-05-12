로그인 화면부터 회원가입, 데이터베이스에 연결까지 되어있습니다. 
다만 데이터베이스는 제 데스크탑 기준으로 localhost로 연결되기 때문에 실제로 할 때에는 aws로 가거나 미리 환경 설정이 필요합니다.
환경변수 설정도 안되어있어서 보안 문제도 있습니다. 


데이터 베이스 생성 쿼리

# 스키마 생성
CREATE SCHEMA mydb;

# 사용자 생성 및 권한 추가
CREATE USER 'mydb'@'localhost' identified with mysql_native_password by 'mydb';
GRANT ALL PRIVILEGES ON mydb.* TO 'mydb'@'localhost';
flush privileges;

# 테이블 생성
CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `id` varchar(30) NOT NULL,
  `name` varchar(30) NULL,
  `psword` varchar(30) NULL,
  `in_data` datetime default current_timestamp,
  PRIMARY KEY (`id`));

show tables;
desc users;
# 테스트 데이터 입력
insert into users(id,name,psword) values ('asdf', 'asdf','1234');
insert into users(id,name,psword) values ('asdfg', 'asdfg','12345');
insert into users(id,name,psword) values ('asd', 'asd','123');
