---
layout: post
title: Undefined reference 问题
date: 2022-05-02 05:30:00 +0800
categories: [C]
tags: [C]
---
找不到某个函数的实现文件

生成静态库

ar -rc func.a func.o  
* 多个库文件链接顺序
依赖其他库的库一定要放到被依赖库的前面

参考
https://blog.51cto.com/ticktick/431329