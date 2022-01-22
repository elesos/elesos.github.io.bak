---
layout: post
title: C和C++开发常见问题
date: 2021-07-04 10:52:49 +0800
categories: [艺搜科技,编程]
tags: [C/C++]
---

- \#pragma pack(push,1)

结构体字节对齐方式设置，把原来对齐方式压栈，并将新的对齐方式设置为一个字节对齐

```
#pragma pack(pop)            恢复对齐状态
```

https://blog.csdn.net/vbLittleBoy/article/details/6935165

- enum不要将变量写在后面

正确的是enum test{}; 而不是enum {} test;

- cpp编译时：error: use of undeclared identifier 'memcpy'

```
#include <string.h>
```

- xcode non-portable path to file specified path differs in case from file name on disk

可能是Include的文件大小写不对。

- xcode __stdcall calling convention ignored for this target

  stdcall is used only on Windows and has no meaning in Linux

```
#ifndef WIN32 
#define __stdcall
#endif
```

- warning C4018: “<”: 有符号/无符号不匹配

一般都是加上强制转换符 (size_t)(bytes - begin) < str.length()

- overrides a member function but is not marked 'override'

覆盖的函数加上override关键字

- Use of undeclared identifier 'std'

看看std后面用的什么组件。加上它的头文件

- error LNK2001

看是不是把dllimport误写成dllexport了
