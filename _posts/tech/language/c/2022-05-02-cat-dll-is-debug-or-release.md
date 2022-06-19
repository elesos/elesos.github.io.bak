---
layout: post
title: 查看dll是debug还是release
date: 2022-05-02 05:30:00 +0800
categories: [c]
tags: [c]
---
用depends工具查看：

debug模式的dll和exe，VCRUNTIME.DLL文件名后面多一个字母D；release模式下则没有D。

x64架构的dll和exe，图标右边都有一个“64”字样的小图标；

## Debug和Release的区别
Debug 和 Release 并没有本质的界限，他们只是一组编译选项的集合

Debug：调试版本，包含调试信息，所以容量比Release大很多，并且不进行任何优化，便于程序员调试。

Debug模式下生成两个文件，除了.exe或.dll文件外，还有一个.pdb文件，该文件记录了代码中断点等调试信息

xcode的 debug 和release在edit secheme里面可以设置。选择run,然后右边的build configuration选debug