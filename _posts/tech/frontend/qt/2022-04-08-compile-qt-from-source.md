---
layout: post
title: Qt 源码编译
date: 2022-04-08 23:30:00 +0800
categories: [Qt]
tags: [Qt]
---

##  支持的平台

Android,iOS,tvOS ,watchOS,Embedded Linux，树莓派

```
mkdir ~/qt-build 
cd ~/qt-build  生成的临时文件会放在此目录
~/qt-source/configure -no-framework -prefix /opt/Qt5.9
qmake 生成Makefiles 
make
make -j1 install  //多个jobs可能会有问题
```

## 常用选项

关闭modules:用-skip选项

包含或排除features:` -feature-<feature> and -no-feature-<feature>`  //configure -list-features,注意features有可能有依赖关系。

禁用3方库 -no-zlib，用系统的-system-zlib，或qt自带的-qt-zlib，注意前面的前缀

```
-platform选项指定系统和编译器，如在windows上，用mingw或vs：
configure.bat -platform win32-g++
configure.bat -platform win32-msvc
```

跨平台编译选项：

-xplatform，目标平台，值类似-platform

-device和-device-option



## 在macOS上编译

支持GCC (GNU Compiler Collection) and Clang

下载 qt-everywhere-opensource-src-%VERSION%.tar.gz    地址 https://download.qt.io/archive/qt/5.15/

默认编译为framework,可以用-no-framework选项编译成动态库dylibs

最后设置环境变量就算完成了：如PATH=/usr/local/Qt-%VERSION%/bin:$PATH



## 参考

https://wiki.qt.io/Building_Qt_5_from_Git

https://doc.qt.io/qt-5/build-sources.html