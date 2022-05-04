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
## size_t int8_t是什么类型
```
size_t  unsigned integer types.
unsigned char	uint8_t
typedef signed char       int8_t;
```
## Convert from int to char*

```
std::string s = std::to_string(number);
char const *pchar = s.c_str();
long stol (const string&  str, size_t* idx = 0, int base = 10);   Convert string to long int, 内部uses strtol (or wcstol) to perform the conversion
long int atol ( const char * str );
```
## 参考
http://stackoverflow.com/questions/9225567/how-to-print-a-int64-t-type-in-c