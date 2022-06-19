---
layout: post
title: Linux 库路径
date: 2022-04-30 05:30:00 +0800
categories: [linux]
tags: [linux]
---
* 如果出现错误：error while loading shared libraries
解决方法：

vim  /etc/ld.so.conf
添加

/usr/local/lib
/usr/local/lib64
后

ldconfig