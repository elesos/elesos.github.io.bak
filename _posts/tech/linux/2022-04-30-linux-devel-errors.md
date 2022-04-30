---
layout: post
title: Linux 常见开发问题
date: 2022-04-30 05:30:00 +0800
categories: [Linux]
tags: [Linux]
---
* /lib/ld-linux.so.2: bad ELF interpreter: 没有那个文件或目录
可能是因为64位系统中安装了32位程序，解决方法：
```
yum install glibc.i686 -y
```
重新安装以后如果还有如下类似错误
```
error while loading shared libraries: libstdc++.so.6: cannot open shared object file: No such file or directory
```
再继续安装包
```
yum install libstdc++.so.6  -y
```
如果冲突：
```
Protected multilib versions: libstdc++-4.8.5-36.el7_6.2.i686 != libstdc++-4.8.5-36.el7.x86_64
```
则先
```
yum install libstdc++
```
error while loading shared libraries: libz.so.1

yum install zlib.i686
docker linux ndk-build 报错：clang: /lib64/libc.so.6: version `GLIBC_2.14' not found
```
strings /lib64/libc.so.6 | grep GLIBC
用centos7吧
```