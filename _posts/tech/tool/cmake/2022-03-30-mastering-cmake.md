---
layout: post
title: Cmake系列1
date: 2022-03-30 05:30:00 +0800
categories: [cmake]
tags: [cmake]
---

https://cmake.org/cmake/help/book/mastering-cmake/index.html


为什么要用cmake

生成的工程与源码隔离开

## 基本语法



常规变量用${var}, CMake运行时确定。

$<FOO>  这种是generator expressions,这种是运行make时才确定。



生成库的输出目录在mac下需要指定CMAKE_LIBRARY_OUTPUT_DIRECTORY

XCODE_ATTRIBUTE_LD_RUNPATH_SEARCH_PATHS 可以设置rpath,多个值用空格不用分号隔开。



find_library(PYTHON_lib_name NAMES Python REQUIRED PATHS ${CMAKE_SOURCE_DIR}/3rdparty/python3/mac)

then use `${PYTHON_lib_name }` in your [`target_link_libraries`](https://cmake.org/cmake/help/latest/command/target_link_libraries.html).



qt的include目录打印Qt5Widgets_INCLUDES变量

目录如果含有空格，需要用双引号



变量

引用变量${var}，环境变量$ENV{var},也可以引用注册表的值


生成app bundle,将WIN32改成MACOSX_BUNDLE

xcode默认会生成Debug目录，如果不想生成，可以为CMAKE_RUNTIME_OUTPUT_DIRECTORY和CMAKE_LIBRARY_OUTPUT_DIRECTORY，或CMAKE_ARCHIVE_OUTPUT_DIRECTORY添加_DEBUG或RELEASE后缀，如CMAKE_RUNTIME_OUTPUT_DIRECTORY_DEBUG

project表示workspace名


-D这种变量，可以放在一个文件里面，里面全是set语句，然后通过-c选项指定该文件

强制更新cache的值

set(VTK_USE_HYBRID   ON   CACHE   BOOL   "doc"    FORCE)


Next 25

