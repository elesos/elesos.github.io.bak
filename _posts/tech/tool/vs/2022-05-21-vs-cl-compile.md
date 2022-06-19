---
layout: post
title: 使用Visual Studio cl编译的步骤
date: 2022-05-21 05:30:00 +0800
categories: [vs]
tags: [vs]
---

如果安装了VS2010，可以直接在开始菜单中打开Microsoft Visual Studio 2010->Visual Studio Tools->Visual Studio 命令提示(2010)，然后直接运行cl。

注意：这种方式打开，开始时会有一个自动设置环境变量的过程。


vs 默认用的Hostx86\x64下的cl.exe编译程序 如果想单独用cl.exe编译。可以用

打开 C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Visual Studio 2017\Visual Studio Tools\VC 目录，里面有7个工具。其中有几个是重复的。 右键其属性，可以在目标里面看到类似：%comspec% /k "C:\Program Files (x86)\Microsoft Visual Studio\2017\Professional\VC\Auxiliary\Build\vcvarsamd64_x86.bat"

其实运行的是Build目录下的bat


如果是 amd64_x86.bat 会给 vcvarsall.bat传 x64_x86 https://docs.microsoft.com/en-us/cpp/build/building-on-the-command-line?view=msvc-160

64.bat的传x64

32.bat的传x86

x86_amd64.bat的传 x86_x64

而 x64_x86 与 x86_x64 的区别就是 HOST_TARGET 这种语法

host表示该软件将运行的平台。

target该软件所处理的目标平台

综上选择x86_amd64.bat那个，即对应x86_x64 Cross Tools Command Prompt for VS 2017

编译器选项
To compile without linking, use the /c option.
生成obj文件 https://docs.microsoft.com/zh-cn/cpp/build/reference/compiler-options?view=msvc-160

链接器选项
生成exe https://docs.microsoft.com/en-us/cpp/build/reference/linker-options?view=msvc-160

lib
LIB (lib.exe) creates standard libraries, import libraries, and export files you can use with LINK

/DEF
https://docs.microsoft.com/en-us/cpp/build/reference/overview-of-lib?view=msvc-160

https://docs.microsoft.com/zh-cn/cpp/build/reference/overview-of-lib?view=msvc-160

会生成exp

https://docs.microsoft.com/en-us/cpp/build/reference/dot-exp-files-as-linker-input?view=msvc-160