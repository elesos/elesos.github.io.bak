---
layout: post
title: C开源库libghttp ghttp 使用
date: 2022-05-02 05:30:00 +0800
categories: [C]
tags: [C]
---
好像不支持https请求

安装
wget http://ftp.gnome.org/pub/gnome/sources/libghttp/1.0/libghttp-1.0.9.tar.gz
tar -zxf libghttp-1.0.9.tar.gz 
cd libghttp-1.0.9
./configure --prefix=/usr/local
make && make install
错误
在64位机器下configure时出现错误:
```
 
...
checking host system type... Invalid configuration `x86_64-unknown-linux-gnu': machine `x86_64-unknown' not recognized

checking build system type... Invalid configuration `x86_64-unknown-linux-gnu': machine `x86_64-unknown' not recognized

...
ltconfig: you must specify a host type if you use `--no-verify'

Try `ltconfig --help 'for more information.

configure: error: libtool configure failed
...
```
解决方法： configure无法识别系统的类型, 所以提示you must specify a host type.

用 /usr/share/libtool/config/config.guess 覆盖源码包中的config.guess

cp /usr/share/libtool/config/config.guess  ./config.guess
用 /usr/share/libtool/config/config.sub 覆盖源码包中的 config.sub

cp /usr/share/libtool/config/config.sub  ./config.sub
这样configure就可以猜出系统的类型了.

参考
http://www.linuxfromscratch.org/blfs/view/6.2.0/gnome/libghttp.html

http://www.fifi.org/doc/libghttp1/ghttp.html