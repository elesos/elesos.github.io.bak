---
layout: post
title: 源码编译zlib
date: 2022-05-02 05:30:00 +0800
categories: [c]
tags: [c]
---
https://zlib.net

没什么特别的--prefix

## win
开始菜单中打开 Visual Studio 目录中的 `VS2017的开发人员命令提示符`，并切换到 zlib 解压目录下；

nmake -f win32/Makefile.msc
或者用cmake-gui