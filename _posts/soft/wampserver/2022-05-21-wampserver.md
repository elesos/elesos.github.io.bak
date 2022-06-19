---
layout: post
title: WampServer 使用手册
date: 2022-05-21 05:30:00 +0800
categories: [wampserver]
tags: [wampserver]
---

WampServer 是Windows下的Apache MySQL PHP集成环境。

自带了phpmyadmin

注意：安装前请先安装VC 2010运行库（vcredist2010.exe ），否则会提示没有找到MSVCR100.dll而导致安装失败。
## 常见问题
打开localhost时报：Forbidden You don't have permission to access / on this server.
修改httpd.conf 将<Directory "c:/wamp/www/"> 的
```
Deny from all 
```
改为
```
Allow from all
```
如果打开phpmyadmin时也报一样的错误：

打开alias目录下的phpmyadmin.conf
```
#Deny from all
#Allow from 127.0.0.1
Allow from all
```
## 参考
http://www.wampserver.com/