---
layout: post
title: CentOS 中文显示乱码
date: 2022-04-30 05:30:00 +0800
categories: [Linux]
tags: [Linux]
---
## 查看
显示正在使用的:locale

显示可用的：locale -a

## 临时修改
export LANG=en_US.UTF-8  # yum install langpacks-zh_CN
## 永久修改
### CentOS6
vim /etc/sysconfig/i18n
source  /etc/sysconfig/i18n
### Centos7
vim /etc/locale.conf
source /etc/locale.conf
## 参考
http://www.centoscn.com/CentOS/Intermediate/2013/0809/1216.html

http://qingqingyulu.iteye.com/blog/680952