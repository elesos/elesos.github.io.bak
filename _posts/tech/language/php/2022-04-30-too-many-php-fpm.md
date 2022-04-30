---
layout: post
title: 解决Linux下php fpm进程过多导致内存耗尽问题
date: 2022-04-30 05:30:00 +0800
categories: [PHP]
tags: [PHP]]
---
首先使用

free -m
查看下free列的值还有多少空闲内存，单位是M

然后使用top看 %MEM 列的内存占比

查看消耗内存最多的前10个进程：
```
ps auxw|head -1;ps auxw|sort -rn -k4|head -10
```
打开php-fpm配置文件
```
vim /etc/php-fpm.d/www.conf
字段pm.max_children      配置php-fpm子进程数量
字段pm.max_spare_servers 空闲进程数最大值，大于此值，则进行清理
字段pm.min_spare_servers 空闲进程数最小值，小于此值，则创建新的子进程
这两个值均不能大于 pm.max_children 的值
pm.start_servers 这个也需要修改
```
每个php-fpm进程的内存限制

php_admin_value[memory_limit] = 128M