---
layout: post
title: 静态编译 程序
date: 2022-05-02 05:30:00 +0800
categories: [c]
tags: [c]
---
yum install glibc-static
gcc -static test.c -lccl
## 参考
https://www.systutorials.com/5217/how-to-statically-link-c-and-c-programs-on-linux-with-gcc/