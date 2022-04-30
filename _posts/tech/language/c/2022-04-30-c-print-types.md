---
layout: post
title: C语言 如何打印各种类型的值
date: 2022-04-30 05:30:00 +0800
categories: [C]
tags: [C]
---
## int64_t
所在头文件inttypes.h

 
int64_t t;
printf("ts=%"PRId64"\n", t);

uint64_t t;
printf("%"PRIu64"\n", t);
## 其它类型
unsigned int # %u
## 参考
http://stackoverflow.com/questions/9225567/how-to-print-a-int64-t-type-in-c