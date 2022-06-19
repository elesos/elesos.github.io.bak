---
layout: post
title: Linux关闭防火墙
date: 2022-04-12 23:30:00 +0800
categories: [linux操作]
tags: [linux操作]
---

## CentOS7

```
systemctl disable firewalld
systemctl stop firewalld
systemctl status firewalld
```

## CentOS6

```
service iptables stop 
chkconfig --level 0123456 iptables off  #开机关闭防火墙
```