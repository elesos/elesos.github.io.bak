---
layout: post
title: CentOS 安装 MySQL
date: 2022-04-30 05:30:00 +0800
categories: [MySQL]
tags: [MySQL]
---
数据库字符集最好用utf8_general_ci，用utf8mb4可能会导致索引创建失败。用bin会导致存储的中文是二进制的，无法直观查看。

## CentOS6
yum install -y mysql-server mysql mysql-devel
## CentOS7
Centos7中用MariaDB代替了mysql数据库。
```
yum erase  mysql-server mysql mysql-devel
wget http://dev.mysql.com/get/mysql-community-release-el7-5.noarch.rpm   # https://github.com/opensourceworker/assets/raw/master/2019/07/mysql-community-release-el7-5.noarch.rpm
rpm -ivh mysql-community-release-el7-5.noarch.rpm
yum install mysql-community-server -y
```
## 5.6升级5.7
yum list installed | grep ^mysql
通过上面命令发现安装的版本是5.6，下面安装的是5.7，需要先yum erase mysql和mysql-community-release。

https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
## 启动
* Can't open and lock privilege tables: Table 'mysql.user' doesn't exist
```
mysql_install_db
service mysqld start //docker里面mysqld --user=root &
ps -aux | grep mysql
```
## 初始配置
修改 root 帐号的密码：
```
mysql -u root
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('password');  //修改密码
```
以后用mysql -p -u root登录

删除除root外的其它用户：
```
delete from mysql.user where not (user="root");
FLUSH PRIVILEGES;
quit;
#select user,host from mysql.user;
```