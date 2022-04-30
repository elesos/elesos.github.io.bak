---
layout: post
title: Python 2.6 升级2.7
date: 2022-04-30 05:30:00 +0800
categories: [Python]
tags: [Python]
---
```
python  -V
wget https://www.python.org/ftp/python/2.7.8/Python-2.7.8.tgz
yum install zlib-devel -y
yum install -y openssl*
```
## 安装
```
./configure  && make all    
make install  
make clean  
make distclean 
/usr/local/bin/python2.7 -V
```  
## 参考
https://www.python.org/ftp/python/2.7.8/

https://www.python.org/download/releases/2.7.8/