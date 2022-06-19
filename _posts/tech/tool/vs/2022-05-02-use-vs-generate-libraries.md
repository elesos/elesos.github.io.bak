---
layout: post
title: Use vs or mingw生成 libraries
date: 2022-05-02 05:30:00 +0800
categories: [c]
tags: [c]
---
It means that the .a static library is incompatible with MS C++ Linker.

Either .a and .lib are just AR archives of .o or .obj files

最好都用同一工具编译

note that MinGW generates 32-bit DLLs only. There is a separate MinGW64 project that can be used to generate 64-bit DLLs.

如果里面有CMakeLists.txt。就用cmake生成vs工程吧