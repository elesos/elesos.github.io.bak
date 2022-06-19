---
layout: post
title: Xcode 调试Qt程序时打印QString
date: 2022-04-07 23:30:00 +0800
categories: [xcode]
tags: [xcode]
---

home目录下新建.lldb文件夹，放入qstring.py文件 https://github.com/tgebarowski/lldb-scripts

创建 ~/.lldbinit文件，写入一条命令command script import ~/.lldb/qstring.py

注意脚本里面的print可能需要改成print()语法。

重启xcode可以看到控制台窗口输出registering QString，即可

## 参考

https://github.com/ivany4/lldb-qt