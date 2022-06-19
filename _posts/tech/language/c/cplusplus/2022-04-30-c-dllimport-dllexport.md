---
layout: post
title: Using dllimport and dllexport in C++ Classes
date: 2022-04-30 05:30:00 +0800
categories: [c++]
tags: [c++]
---
https://docs.microsoft.com/en-us/cpp/cpp/using-dllimport-and-dllexport-in-cpp-classes?view=msvc-160

All its member functions and static data are exported:

class DllExport C {
注意DllExport前面要注意是否有extern,如果有可能会错误
```
#define DllExport extern __declspec( dllexport )
#define DllExport        __declspec( dllexport )
```