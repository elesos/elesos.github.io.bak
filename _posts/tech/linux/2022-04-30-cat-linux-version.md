---
layout: post
title: 查看 Linux 系统版本 位数
date: 2022-04-30 05:30:00 +0800
categories: [Linux]
tags: [Linux]
---
## 查看系统信息
```
lsb_release -a  #LSB (Linux Standard Base)
cat /etc/redhat-release #centos7用这个
cat /etc/issue 
uname -a  # uname -m
cat /proc/version
```
## 查看位数
```
uname -m # 常见结果：armv7l,x86_64
arch
getconf LONG_BIT
getconf WORD_BIT
file  /bin/ls # 如果有x86_64就是64位的，没有就是32位的（如i386,i686）。
```