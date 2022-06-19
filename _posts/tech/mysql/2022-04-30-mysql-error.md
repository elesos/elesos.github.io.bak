---
layout: post
title: MySQL 常见错误
date: 2022-04-30 05:30:00 +0800
categories: [mysql]
tags: [mysql]
---
* Syntax error or access violation: 1071 Specified key was too long; max key length is 767 bytes
多字节字符集的大字段上创建索引时，超出索引字节的限制，如utf8mb4是4字节字符集，默认支持的索引字段最大长度是191字符（767字节/4字节每字符≈191字符），因此在varchar(255)或char(255)类型字段上创建索引会失败。

utf8字符集一个字符占3个bytes。因此在utf8字符集下，innodb存储引擎创建索引的单列长度不能超过255个字符

解决：改成utf8字符集

* 2002 无法登录 MySQL 服务器 或者 mysqli_real_connect(): (HY000/2002): Permission denied
如果是phpmyadmin，修改：

将$cfg['Servers'][$i]['host'] = 'localhost';

改为$cfg['Servers'][$i]['host'] = '127.0.0.1';

也可能是mysql服务没有启动

* ERROR 145 (HY000): Table 'xxx' is marked as crashed and should be repaired
mysqlcheck -uroot -p --repair --all-databases
* 启动时 Fatal error: Can't open and lock privilege tables: Table storage engine for 'user' doesn't have this option
```
chown -R mysql:mysql /var/lib/mysql /var/run/mysqld
```
## 参考
https://help.aliyun.com/knowledge_detail/41707.html