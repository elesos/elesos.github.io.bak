---
layout: post
title: MySQL 导入导出
date: 2022-04-30 05:30:00 +0800
categories: [mysql]
tags: [mysql]
---
## 导出
不能停止服务
```
cd /var/lib/mysql 
mysqldump -u用户名 -p 数据库名 > 导出的文件名.sql
```
## 导入
先建好表
```
mysql>use DATABASE_NAME;   
mysql>source path/to/file.sql;
```
## 导出某张表
导出单张或多张表的话在数据库名后面输入表名即可，多张表用空格分开
```
mysqldump -u 用户名 -p 数据库名 表名 > 导出的文件名.sql 
mysqldump -u 用户名 -p --all-databases > all-db.sql  #这种不方便导入
```