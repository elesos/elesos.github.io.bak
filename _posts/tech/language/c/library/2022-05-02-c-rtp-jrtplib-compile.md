---
layout: post
title: RTP库jrtplib编译指南
date: 2022-05-02 05:30:00 +0800
categories: [c]
tags: [c]
---
c++开发

The library uses the JThread library to automatically poll 轮询 for incoming data in the background, so you may want to install it too.

Of course, if you'd rather not have it installed, the library will also work without JThread (but you'll have to poll for incoming data yourself).

安装jThread
如果需要安装jThread,需要CMake 3.0 or higher is required.

cmake -version
## 安装jtread

cmake  CMakeLists.txt 
make && make install
如果不需要jthread，就直接到jstplib目录下执行

cmake .或  cmake  CMakeLists.txt 
make && make install
## 参考
https://github.com/j0r1/JRTPLIB

http://research.edm.uhasselt.be/jori/page/CS/Jrtplib.html

http://blog.csdn.net/zhangjikuan/article/details/27974733