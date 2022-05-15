---
layout: post
title: Redis常用命令
date: 2022-05-15 05:30:00 +0800
categories: [艺搜科技]
tags: [redis]
---

## 安装
make
make PREFIX=/usr/local install
mkdir /etc/redis  #然后放上已经配置好的redis.conf
## 运行

redis-server /etc/redis/redis.conf
## 命令
set key value
get key
删除key (返回被移除key的数量):del  key