---
layout: post
title: Xcode简明教程
date: 2021-07-04 12:06:30 +0800
categories: [艺搜科技,编程]
tags: [Xcode]
---

https://help.apple.com/xcode/mac/current/

https://developer.apple.com/documentation/xcode/

# 中文乱码

用文本编辑器打开,保存

# Xcode-select是什么

Print or change the path to the active developer directory. This directory controls which tools are used for the Xcode command line tools

你可以在 Xcode -> Preference -> Locations 去选择自己得 Command Line Tools，

在这里选择 效力等同于 xcode-select,

# XCode环境变量

```
$(PROJECT_DIR) .xcodeproj所在目录
$(TARGETNAME) 工程名称
```

# 调试 填写 命令行参数

Edit Scheme，弹出一个对话框如下，在Run->Arguments按顺序填写需要的命令行参数。

# Xcode scheme 排列 乱序

Open the file [YourApp].xcodeproj/xcuserdata/[YourUsername].xcuserdata/xcschemes/xcschememanagement.plist

The "SchemeUserState" dictionary has entries for each scheme. In my file at least, they seem to be in alphabetical order. However, there is an integer key "orderHint" that seems to control the order in the scheme dropdown.

# 





# 架构问题

You should leave ARCHS at the default, which is ARCHS_STANDARD.





查看变量的地址值和内存值

![](/assets/mac/xcode.png)

在控制台里面输入x/16xb self  语法是x/nfu <addr>

其中/n表示要显示的内存单元的个数，就是输出多长的内存。上面是输出了16个字节的内存

x:按十六进制格式显示

b:表示单字节

或者右键View Memory of xxx

